import React from 'react'
import { graphql } from 'gatsby'
import { get, map, compose } from 'lodash/fp'

import { nodes } from 'system/helpers'
import { Flex, Heading, Text, Link } from 'system'
import { Layout } from 'src/components/Layout'
import { Product } from 'src/components/Product'

const ProductTemplate = ({ data, pageContext }) => {
  const products = compose(
    nodes,
    get('allShopifyProduct')
  )(data)

  return (
    <Layout>
      <Heading mb={2}>Products</Heading>
      {map(
        product => (
          <Product
            key={get('id', product)}
            handle={get('handle', product)}
            title={get('title', product)}
            descriptionHtml={get('descriptionHtml', product)}
            mb={2}
            boxStyle="lastNoMargin"
          />
        ),
        products
      )}
      <Flex as="nav">
        {get('previousPagePath', pageContext) && (
          <Text
            as={Link}
            to={get('previousPagePath', pageContext)}
            display="inline-block"
            mr={2}
          >
            Previous
          </Text>
        )}
        {get('nextPagePath', pageContext) && (
          <Text
            as={Link}
            to={get('nextPagePath', pageContext)}
            display="inline-block"
          >
            Next
          </Text>
        )}
      </Flex>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query ProductsTemplate($skip: Int!, $limit: Int!) {
    allShopifyProduct(skip: $skip, limit: $limit) {
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
`
