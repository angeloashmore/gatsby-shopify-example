import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { get, map, compose } from 'lodash/fp'

import { nodes } from 'src/helpers'
import { Product } from 'src/components/Product'

const render = props => queryData => {
  const products = compose(
    nodes,
    get('allShopifyProduct')
  )(queryData)

  return (
    <ul {...props}>
      {map(
        product => (
          <Product
            key={get('id', product)}
            title={get('title', product)}
            descriptionHtml={get('descriptionHtml', product)}
            to={`/products/${get('handle', product)}/`}
            mb={2}
            boxStyle="lastNoMargin"
          />
        ),
        products
      )}
    </ul>
  )
}

export const ProductList = props => (
  <StaticQuery
    query={graphql`
      query {
        allShopifyProduct(sort: { fields: [title] }) {
          edges {
            node {
              id
              handle
              title
              descriptionHtml
            }
          }
        }
      }
    `}
    render={render(props)}
  />
)
