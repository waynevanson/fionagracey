import { graphql } from "gatsby"

export default function Recipe() {}

export const query = graphql`
  query RecipeById($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
