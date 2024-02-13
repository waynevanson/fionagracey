import { Link, PageProps, graphql } from "gatsby"
import React from "react"

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
      [0] as Array<number>
    ) ?? []

  return (
    <>
      <Link to="/recipes">Back to recipes</Link>
      <article>
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
          <ul>
            {data.methods?.map((method, methodIndex) => (
              <li>
                {showInstructionSubHeading && <h4>{method?.label}</h4>}
                <ol className="flex flex-col gap-2">
                  {method?.steps?.map((step, stepIndex) => (
                    <li className="flex gap-2">
                      <div className="p-2 bg-slate-600 text-slate-100 fill rounded-full">
                        {methodCountCumulativeByIndex[methodIndex] +
                          stepIndex +
                          1}
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
