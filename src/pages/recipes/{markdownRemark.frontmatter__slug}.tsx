import { Link, PageProps, graphql } from "gatsby"
import React from "react"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  const data = props.data.markdownRemark?.frontmatter

  if (data != null) {
    return <div>Sorry but this recipe has a formatting error. We will fix.</div>
  }

  return (
    <article>
      <Link to="/recipes">Back to recipes</Link>
      <section></section>
    </article>
  )
}

export const query = graphql`
  query RecipeBySlug($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
      }
      html
    }
  }
`
