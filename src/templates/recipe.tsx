import { PageProps, graphql } from "gatsby"
import React from "react"
import { Link } from "../components"
import { useLocalStorage } from "../hooks"

export default function Recipe(props: PageProps<Queries.RecipeByIdQuery>) {
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
        const prevSum = accu[methodIndex]
        const stepCount = method?.steps?.length ?? 0
        const nextSum = prevSum + stepCount
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
          <h3 className="text-lg font-bold">Ingredients</h3>
          <ul>
            {data.ingredients?.map((ingredient, index) => {
              const id =
                (ingredient?.amount ?? "") + " " + (ingredient?.name ?? "")
              const checked = ingredientChecked(index)
              return (
                <li key={ingredient?.name}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={checked}
                    onChange={() => {
                      ingredientCheckedSet(index)
                    }}
                    id={id}
                    name={id}
                  />
                  <label className={checked ? "line-through" : ""} htmlFor={id}>
                    <span>{ingredient?.amount} </span>
                    <span>{ingredient?.name}</span>
                    {ingredient?.note && (
                      <span>
                        {" -"} {ingredient.note}
                      </span>
                    )}
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Instructions</h3>
          <ul className="flex flex-col gap-4">
            {data.methods?.map((method, methodIndex) => (
              <li key={method?.label} className="flex flex-col gap-4">
                {showInstructionSubHeading && (
                  <h4 className="text-md font-medium">{method?.label}</h4>
                )}
                <ol className="flex flex-col gap-2">
                  {method?.steps?.map((step, stepIndex) => (
                    <li key={step} className="flex gap-2">
                      <span className="bg-slate-600 text-slate-100 h-8 aspect-square flex flex-initial rounded-full justify-center items-center p-1">
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
  query RecipeById($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
        ingredients {
          amount
          name
          note
        }
        methods {
          label
          steps
        }
      }
    }
  }
`

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
