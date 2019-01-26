import React, { Suspense } from 'react'
import { get } from 'lodash/fp'

import { useShopifyProductVariantWithContext } from 'src/shopify'
import { Box } from 'system'
import { Button } from 'src/components/Button'

const LiveAddToCartButton = ({ productVariantId, ...props }) => {
  const {
    productVariant,
    error,
    actions: { addToCheckout },
  } = useShopifyProductVariantWithContext(productVariantId)

  const isAvailable = get('available', productVariant)
  if (error) return error.message

  return (
    <Button onClick={() => addToCheckout()} disabled={!isAvailable} {...props}>
      {isAvailable ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  )
}

export const ProductVariant = ({
  id,
  title,
  price,
  checkoutLocal,
  checkoutLineItemsReplace,
  ...props
}) => (
  <Box {...props}>
    <h4>{title}</h4>
    <dl>
      <dt>Price</dt>
      <dd>${price}</dd>
      <Suspense fallback="Loading&hellip;">
        <LiveAddToCartButton productVariantId={id} />
      </Suspense>
    </dl>
  </Box>
)
