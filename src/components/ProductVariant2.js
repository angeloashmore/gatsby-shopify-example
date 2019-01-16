import React, { Suspense } from 'react'
import {
  useShopifyProduct,
  useShopifyProductVariant,
} from 'react-shopify-hooks'
import { get } from 'lodash/fp'

import { Box, Subheading, Text } from 'system'
import { Button } from 'src/components/Button'

const AddToCartButton = ({ productId, variantId }) => {
  const { product } = useShopifyProduct(productId)
  const { productVariant, error } = useShopifyProductVariant(
    productId,
    variantId
  )
  const isAvailable = get('available', productVariant)

  if (error) return `Error! ${error.message}`

  console.log(product)

  return (
    <Button disabled={!isAvailable}>
      {isAvailable ? 'Add to cart' : 'Out of stock'}
    </Button>
  )
}

export const ProductVariant = ({
  productId,
  variantId,
  title,
  price,
  ...props
}) => (
  <Box {...props}>
    <Subheading mb={1}>{title}</Subheading>
    <Box as="dl">
      <Box as="dt">Price</Box>
      <Box as="dd">${price}</Box>
      <Suspense fallback={<Text>Loading&hellip;</Text>}>
        <AddToCartButton productId={productId} variantId={variantId} />
      </Suspense>
    </Box>
  </Box>
)
