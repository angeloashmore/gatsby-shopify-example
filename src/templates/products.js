import React from 'react'
import { graphql } from 'gatsby'
import { get, map, compose } from 'lodash/fp'

import { nodes } from 'src/helpers'
import { Flex, Heading } from 'src/components/system'
import { Layout } from 'src/components/Layout'
import { Link } from 'src/components/Link'
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
          <Link to={get('previousPagePath', pageContext)}>Previous</Link>
        )}
        {get('nextPagePath', pageContext) && (
          <Link to={get('nextPagePath', pageContext)}>Next</Link>
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
