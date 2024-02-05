import { error } from "console"
import { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const query = await graphql<Queries.RecipesSlugsQuery>(`
    query RecipesSlugs {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (query.errors) throw query.errors

  query.data?.allMarkdownRemark.edges.forEach((edge) => {
    const slug = edge.node.frontmatter?.slug

    actions.createPage({
      path: `recipes/${slug}`,
      component: path.resolve("./src/templates/recipe.tsx"),
      context: { slug },
    })
  })
}
