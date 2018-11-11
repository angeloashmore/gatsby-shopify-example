import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { get, map, compose } from 'lodash/fp'

import { nodes } from 'src/helpers'

const render = props => queryData => {
  const products = compose(
    nodes,
    get('allShopifyProduct')
  )(queryData)

  return (
    <ul {...props}>
      {map(
        product => (
          <li key={get('id', product)}>
            <Link to={`/products/${get('handle', product)}/`}>
              {get('title', product)}
            </Link>
          </li>
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
              title
              handle
            }
          }
        }
      }
    `}
    render={render(props)}
  />
)
