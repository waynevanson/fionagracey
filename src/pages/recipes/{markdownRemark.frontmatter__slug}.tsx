import { PageProps, graphql } from "gatsby"
import React from "react"
import { Link } from "../../components"
import { useLocalStorage } from "../../hooks"

function useLocalStorageCheckboxes(key: string) {
  const [checks, checksSet] = useLocalStorage<Array<number>>(key, [])

  const checkSet = (index: number) => {
    checksSet((checked) => {
      const next = [...checked]

      let checkedIndex = next.indexOf(index)
      if (checkedIndex < 0) {
        next.push(index)
      } else {
        next.splice(checkedIndex, 1)
      }

      return next
    })
  }

  const getCheck = (index: number) => checks.includes(index)

  return [getCheck, checkSet] as const
}

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  const [ingredientChecked, ingredientCheckedSet] = useLocalStorageCheckboxes(
    `recipe/${props.params.frontmatter__slug}/ingredients/checked`
  )

  if (data == null) {
    return <div>Sorry but this recipe has a data error. We will fix.</div>
  }

  const showInstructionSubHeading = (data.methods?.length ?? 0) > 1

  const methodCountCumulativeByIndex =
    props.data.markdownRemark?.frontmatter?.methods?.reduce(
      (accu, method, methodIndex) => {
        const prevSum = methodIndex > 0 ? accu[methodIndex - 1] : 0
        const stepCount = method?.steps?.length ?? 0
        const nextSum = prevSum + stepCount + 1
        accu.push(nextSum)
        return accu
      },
      [1] as Array<number>
    ) ?? []

  function calculateStep(methodIndex: number, stepIndex: number) {
    return methodCountCumulativeByIndex[methodIndex] + stepIndex
  }

  return (
    <>
      <Link
        href="/recipes"
        className="underline text-slate-600 focus:text-slate-400 rounded-md outline-offset-4"
      >
        Back to recipes
      </Link>
      <article className="flex flex-col gap-4">
        <h2>{data.title}</h2>
        <small>
          By {data.author} on {data.date && new Date(data?.date).toDateString()}
        </small>
        <section className="flex flex-col gap-2">
          <h3 className="text-lg">Ingredients</h3>
          <ul>
            {data.ingredients?.map((ingredient, index) => (
              <li key={ingredient?.name}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={ingredientChecked(index)}
                  onChange={() => {
                    ingredientCheckedSet(index)
                  }}
                  id={ingredient?.name ?? undefined}
                  name={ingredient?.name ?? undefined}
                />
                <label
                  className={
                    ingredientChecked(index) ?? false ? "line-through" : ""
                  }
                  htmlFor={ingredient?.name ?? undefined}
                >
                  <span>{ingredient?.amount} </span>
                  <span>{ingredient?.measurement} </span>
                  <span>{ingredient?.measurement && "of "}</span>
                  <span>{ingredient?.name}</span>
                  {ingredient?.note && (
                    <span>
                      {" -"} {ingredient.note}
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-lg">Instructions</h3>
          <ul className="flex flex-col gap-4">
            {data.methods?.map((method, methodIndex) => (
              <li key={method?.label} className="flex flex-col gap-4">
                {showInstructionSubHeading && (
                  <h4 className="text-md">{method?.label}</h4>
                )}
                <ol className="flex flex-col gap-2">
                  {method?.steps?.map((step, stepIndex) => (
                    <li key={step} className="flex gap-2">
                      <span className="bg-slate-600 text-slate-100 aspect-square flex flex-initial rounded-full justify-center items-center p-1">
                        {calculateStep(methodIndex, stepIndex)}
                      </span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}

export const query = graphql`
  query RecipeBySlug($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
        ingredients {
          amount
          measurement
          name
          note
        }
        methods {
          label
          steps
        }
      }
      html
    }
  }
`
