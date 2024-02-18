import { PageProps, graphql } from "gatsby"
import React from "react"
import { Link } from "../components"

export default function Recipes(props: PageProps<Queries.RecipeQuery>) {
  return (
    <div>
      {props.data?.cookbook?.recipes?.map((post) => (
        <Link
          href={`/recipes/${post.frontmatter?.slug}`}
          className="p-4 rounded-lg block bg-slate-200 hover:bg-slate-300 focus:bg-slate-300"
        >
          <article key={post.id}>
            <h2 className="text-xl">{post?.frontmatter?.title}</h2>
            <small>
              <span>{post?.frontmatter?.author}</span>
              {post.frontmatter?.date && (
                <span>, {new Date(post.frontmatter.date).toDateString()}</span>
              )}
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
