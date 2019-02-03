import React from 'react'
import { graphql } from 'gatsby'
import { get, map, compose } from 'lodash/fp'
import { nodes } from 'helpers'

import { Grid, Flex, Heading, Text, Link } from 'system'

import { Layout } from 'src/components/Layout'
import { Product } from 'src/components/Product'

const ProductsTemplate = ({ data, pageContext }) => {
  const products = compose(
    nodes,
    get('allShopifyProduct')
  )(data)

  return (
    <Layout>
      <Grid
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gridColumnGap={2}
        gridRowGap={2}
        p={2}
      >
        {map(
          product => (
            <Product
              key={get('id', product)}
              handle={get('handle', product)}
              title={get('title', product)}
              price={`$${get('priceRange.maxVariantPrice.amount', product)}`}
              imageFluid={get(
                'images[0].localFile.childImageSharp.fluid',
                product
              )}
              mb={2}
              boxStyle="lastNoMargin"
            />
          ),
          products
        )}
      </Grid>
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

export default ProductsTemplate

export const query = graphql`
  query ProductsTemplate($skip: Int!, $limit: Int!) {
    allShopifyProduct(skip: $skip, limit: $limit) {
      edges {
        node {
          id
          handle
          title
          descriptionHtml
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`
