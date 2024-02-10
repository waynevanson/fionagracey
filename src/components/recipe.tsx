import { PageProps, graphql } from "gatsby"
import React from "react"
import { Link } from "./page-layout"

export default function Recipe(props: PageProps<Queries.RecipeBySlugQuery>) {
  return (
    <div>
      <Link to="/recipes">Back to recipes</Link>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.recipe?.html ?? "" }}
      />
    </div>
  )
}

export const query = graphql`
  query RecipeBySlug($slug: String) {
    recipe: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
        slug
      }
      excerpt
      html
    }
  }
`
