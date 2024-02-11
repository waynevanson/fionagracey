import { Link, PageProps, graphql } from "gatsby"
import React from "react"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  if (data == null) {
    return <div>Sorry but this recipe has a data error. We will fix.</div>
  }

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
                {ingredient?.amount} {ingredient?.measurement}{" "}
                {ingredient?.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          <ul>
            {data.methods?.map((method) => (
              <li>
                <big>{method?.label}</big>
                <ol>
                  {method?.steps?.map((step) => (
                    <li>{step}</li>
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
