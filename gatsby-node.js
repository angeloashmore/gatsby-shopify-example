const path = require('path')
const { forEach, compose, get, map } = require('lodash/fp')
const { paginate } = require('gatsby-awesome-pagination')

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

  const products = compose(
    map('node'),
    get('data.allShopifyProduct.edges')
  )(result)

  // Paginated products pages
  paginate({
    createPage,
    items: products,
    itemsPerPage: 9,
    pathPrefix: '/products',
    component: path.resolve('./src/templates/products.js'),
  })

  // Individual product pages
  forEach(
    product =>
      createPage({
        path: `/products/${get('handle', product)}/`,
        component: path.resolve('./src/templates/product.js'),
        context: {
          id: get('id', product),
        },
      }),
    products
  )
}
