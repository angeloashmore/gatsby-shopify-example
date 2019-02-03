import React from 'react'
import { graphql } from 'gatsby'
import { get, map, compose, head, tail } from 'lodash/fp'

import {
  Box,
  Grid,
  Flex,
  Text,
  Link,
  HTML,
  GatsbyImageContainer,
  GatsbyImage,
  AspectRatio,
  SVG,
} from 'system'
import { Button } from 'src/components/Button'
import { HTMLContent } from 'src/components/HTMLContent'
import { Heading } from 'src/components/Heading'
import { Layout } from 'src/components/Layout'
import { ProductVariant } from 'src/components/ProductVariant'
import { Subheading } from 'src/components/Subheading'
import { ReactComponent as AssetIconPlusSVG } from 'src/assets/icon-plus.svg'

const ProductImage = ({ fluid, alt, ...props }) =>
  fluid ? (
    <GatsbyImageContainer {...props}>
      <AspectRatio x={1} y={1}>
        <GatsbyImage fluid={fluid} alt={alt} />
      </AspectRatio>
    </GatsbyImageContainer>
  ) : null

const ProductTemplate = ({ data }) => {
  const product = get('shopifyProduct', data)
  const images = compose(
    map(get('localFile.childImageSharp.fluid')),
    get('images')
  )(product)

  return (
    <Layout>
      <Box p={2}>
        <Link
          display="block"
          to="/products/"
          fontFamily="mono"
          fontSize="small"
          mb={2}
        >
          &lt; shop
        </Link>
        <Grid
          borderColor="black"
          borderTop={2}
          gridColumnGap={2}
          gridTemplateColumns={[null, 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          mb={4}
        >
          <Heading
            borderTop={[2, null, 4]}
            borderColor={['accent', null, 'accent']}
            fontSize={['medium', null, 'small']}
            lineHeight="title"
            fontWeight="semibold"
            pt={1}
          >
            {get('title', product)}
          </Heading>
        </Grid>
        <Grid
          borderColor={[null, 'black']}
          borderTop={[null, 2]}
          gridColumnGap={2}
          gridRowGap={2}
          gridTemplateColumns={[null, 'repeat(2, 1fr)']}
          pt={1}
        >
          <ProductImage fluid={head(images)} alt={get('title', product)} />
          <Grid
            alignSelf="start"
            gridColumnGap={2}
            gridRowGap={2}
            gridTemplateColumns={[null, 'repeat(6, 1fr)']}
          >
            <Button display="block" width={1} gridColumn={[null, 'span 3']}>
              <Flex alignItems="center" justifyContent="center">
                Add to Cart
                <SVG
                  svg={AssetIconPlusSVG}
                  x={1}
                  y={1}
                  fill="white"
                  width="1rem"
                  ml="0.25rem"
                />
              </Flex>
            </Button>
            <Text fontWeight="semibold" gridColumn={[null, 'span 3']}>
              ${get('priceRange.minVariantPrice.amount', product)}
            </Text>
            <Subheading
              gridColumn="1 / -1"
              borderColor="black"
              borderTop={2}
              pt={1}
            >
              About
            </Subheading>
            <HTMLContent
              html={get('descriptionHtml', product)}
              gridColumn={[null, '1 / -1', 'span 4']}
              fontFamily="mono"
              fontSize={['normal', 'small']}
            />
          </Grid>
          {map(
            image => (
              <ProductImage fluid={image} alt={get('title', product)} />
            ),
            tail(images)
          )}
        </Grid>
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
      images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
      variants {
        id
        shopifyId
        title
        price
      }
    }
  }
`
