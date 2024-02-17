import { PageProps, graphql } from "gatsby"
import React from "react"
import { Link } from "../../components"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  if (data == null) {
    return <div>Sorry but this recipe has a data error. We will fix.</div>
  }

  const showInstructionSubHeading = (data.methods?.length ?? 0) > 1

  const methodCountCumulativeByIndex =
    props.data.markdownRemark?.frontmatter?.methods?.reduce(
      (accu, method, methodIndex) => {
        const prevSum = methodIndex > 0 ? accu[methodIndex - 1] : 0
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
      <article className="flex flex-col gap-2">
        <h2>{data.title}</h2>
        <small>
          By {data.author} on {data.date && new Date(data?.date).toDateString()}
        </small>
        <section>
          <h3>Ingredients</h3>
          <ul>
            {data.ingredients?.map((ingredient) => (
              <li>
                <span>{ingredient?.amount} </span>
                <span>{ingredient?.measurement} </span>
                <span>{ingredient?.measurement && "of "}</span>
                <span>{ingredient?.name}</span>
                {ingredient?.note && (
                  <span>
                    {" -"} {ingredient.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          <ul className="flex flex-col gap-2">
            {data.methods?.map((method, methodIndex) => (
              <li>
                {showInstructionSubHeading && <h4>{method?.label}</h4>}
                <ol className="flex flex-col gap-2">
                  {method?.steps?.map((step, stepIndex) => (
                    <li className="flex gap-2">
                      <div className="bg-slate-600 text-slate-100 aspect-square flex flex-initial rounded-full justify-center items-center p-1">
                        {calculateStep(methodIndex, stepIndex)}
                      </div>
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
