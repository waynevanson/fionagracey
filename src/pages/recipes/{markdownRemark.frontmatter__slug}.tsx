import { Link, PageProps, graphql } from "gatsby"
import React from "react"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  return (
    <div>
      <Link to="/recipes">Back to recipes</Link>
      <div
        dangerouslySetInnerHTML={{
          __html: props.data.markdownRemark?.html ?? "",
        }}
      />
    </div>
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
