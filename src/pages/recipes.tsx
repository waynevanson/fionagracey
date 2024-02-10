import { PageProps, graphql, navigate } from "gatsby"
import React from "react"
import * as styles from "./recipes.module.scss"

export default function Recipes(props: PageProps<Queries.RecipeQuery>) {
  return (
    <div>
      {props.data?.cookbook?.recipes?.map((post) => (
        <article className={styles.item} key={post.id}>
          <div
            onClick={() => {
              navigate(`/recipes/${post.frontmatter?.slug}`)
            }}
          >
            <h2>{post?.frontmatter?.title}</h2>
            <small>
              {post?.frontmatter?.author}, {post?.frontmatter?.date}
            </small>
            <p>{post?.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export const Head = () => <title>Recipes</title>

export const query = graphql`
  query Recipe {
    cookbook: allMarkdownRemark {
      recipes: nodes {
        frontmatter {
          slug
          date
          title
          author
        }
        excerpt
        id
      }
    }
  }
`
