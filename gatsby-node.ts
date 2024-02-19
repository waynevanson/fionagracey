import { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const query = await graphql(`
    query RecipesPages {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  const component = path.resolve("src/templates/recipe.tsx")

  // File system router isn't working as expected..
  //@ts-expect-error
  query.data.allMarkdownRemark.nodes.map((node) => {
    const slug: string = node.frontmatter.slug
    actions.createPage({
      path: `recipes/${slug}`,
      component,
      context: { slug },
    })
  })
}
