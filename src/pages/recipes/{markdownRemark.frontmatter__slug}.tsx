import { Link, PageProps, graphql } from "gatsby"
import React from "react"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  if (data == null) {
    return <div>Sorry but this recipe has a data error. We will fix.</div>
  }

  const showInstructionSubHeading = (data.methods?.length ?? 0) > 1

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
                <ol>
                  {method?.steps?.map((step, stepIndex) => (
                    <li>
                      <div>{(methodIndex + 1) * stepIndex + 1}</div>
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
