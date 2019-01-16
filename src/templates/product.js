import React from 'react'
import { graphql } from 'gatsby'
import { get, map } from 'lodash/fp'

import { Link } from 'system'
import { Layout } from 'src/components/Layout'
import { ProductVariant } from 'src/components/ProductVariant2'

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
                productId={get('shopifyId', product)}
                variantId={get('shopifyId', variant)}
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
      shopifyId
      title
      handle
      descriptionHtml
      variants {
        shopifyId
        title
        price
      }
    }
  }
`
