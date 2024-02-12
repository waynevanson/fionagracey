import { Link, PageProps, graphql } from "gatsby"
import React from "react"
import * as styles from "./recipe.module.sass"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  if (data == null) {
    return <div>Sorry but this recipe has a data error. We will fix.</div>
  }

  return (
    <>
      <Link to="/recipes">Back to recipes</Link>
      <article className={styles.recipe}>
        <h2>{data.title}</h2>
        <small>
          By {data.author} on {data.date && new Date(data?.date).toDateString()}
        </small>
        <section>
          <h3>Ingredients</h3>
          <ul className={styles.ingredients}>
            {data.ingredients?.map((ingredient) => (
              <li>
                {ingredient?.amount} {ingredient?.measurement} of{" "}
                {ingredient?.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          <ul className={styles.instructions}>
            {data.methods?.map((method, methodIndex) => (
              <li className={styles.instruction}>
                <big>{method?.label}</big>
                <ol className={styles.steps}>
                  {method?.steps?.map((step, stepIndex) => (
                    <li className={styles.step}>
                      <div className={styles.stepNumber}>
                        {(methodIndex + 1) * stepIndex + 1}
                      </div>
                      <p className={styles.stepText}>{step}</p>
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
