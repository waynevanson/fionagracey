import { PageProps, graphql, navigate } from "gatsby"
import React from "react"
import { Link } from "../components"

export default function Recipes(props: PageProps<Queries.RecipeQuery>) {
  return (
    <div>
      {props.data?.cookbook?.recipes?.map((post) => (
        <Link href={`/recipes/${post.frontmatter?.slug}`}>
          <article key={post.id}>
            <h2>{post?.frontmatter?.title}</h2>
            <small>
              {post?.frontmatter?.author}, {post?.frontmatter?.date}
            </small>
            <p>{post?.excerpt}</p>
          </article>
        </Link>
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
