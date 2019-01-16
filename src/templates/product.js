import React from 'react'
import { graphql } from 'gatsby'
import { get, map } from 'lodash/fp'

import { Box, Link, HTML } from 'system'
import { Heading } from 'src/components/Heading'
import { Layout } from 'src/components/Layout'
import { ProductVariant } from 'src/components/ProductVariant'
import { Subheading } from 'src/components/Subheading'

const ProductTemplate = ({ data }) => {
  const product = get('shopifyProduct', data)

  return (
    <Layout>
      <Link to="/products/" mb={2}>
        Go to all products
      </Link>
      <Heading mb={2}>{get('title', product)}</Heading>
      <Subheading>Description</Subheading>
      <Box mb={2}>
        <HTML html={get('descriptionHtml', product)} />
      </Box>
      <Subheading>Variants</Subheading>
      <Box as="ul">
        {map(
          variant => (
            <Box
              as="li"
              key={get('id', variant)}
              mb={1}
              boxStyle="lastNoMargin"
            >
              <ProductVariant
                productId={get('shopifyId', product)}
                variantId={get('shopifyId', variant)}
                title={get('title', variant)}
                price={get('price', variant)}
              />
            </Box>
          ),
          get('variants', product)
        )}
      </Box>
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
        id
        shopifyId
        title
        price
      }
    }
  }
`
