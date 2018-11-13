import React from 'react'
import { Link, graphql } from 'gatsby'
import { get, map } from 'lodash/fp'

import Layout from 'src/components/layout'
import { ProductVariant } from 'src/components/ProductVariant'

const ProductTemplate = ({ data }) => {
  const product = get('shopifyProduct', data)

  return (
    <Layout>
      <p>
        <Link to="/products/">Go to all products</Link>
      </p>
      <h2>{get('title', product)}</h2>
      <h3>Description</h3>
      <div
        dangerouslySetInnerHTML={{ __html: get('descriptionHtml', product) }}
      />
      <h3>Variants</h3>
      <ul>
        {map(
          variant => (
            <li key={get('id', variant)}>
              <ProductVariant
                id={get('shopifyId', variant)}
                productHandle={get('handle', product)}
                title={get('title', variant)}
                price={get('price', variant)}
              />
            </li>
          ),
          get('variants', product)
        )}
      </ul>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query ProductTemplate($id: String!) {
    shopifyProduct(id: { eq: $id }) {
      title
      handle
      descriptionHtml
      variants {
        id
        shopifyId
        title
        price
      }
    }
  }
`
