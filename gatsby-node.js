const path = require('path')
const { forEach, compose, get, map } = require('lodash/fp')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  compose(
    forEach(createPage),
    map(x => ({
      path: `/products/${get('handle', x)}/`,
      component: path.resolve('./src/templates/product.js'),
      context: {
        id: get('id', x),
      },
    })),
    map('node'),
    get('data.allShopifyProduct.edges')
  )(result)
}
