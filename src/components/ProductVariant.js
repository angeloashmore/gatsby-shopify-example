import React, { Suspense } from 'react'
import { get } from 'lodash/fp'

import { useShopifyProductVariant } from 'src/shopify'
import { Box } from 'system'
import { Button } from 'src/components/Button'

const LiveAddToCartButton = ({ productId, variantId, ...props }) => {
  const { productVariant, error } = useShopifyProductVariant(
    productId,
    variantId
  )
  const isAvailable = get('available', productVariant)
  if (error) return error.message

  return (
    <Button
      onClick={() => console.log('add to cart')}
      disabled={!isAvailable}
      {...props}
    >
      {isAvailable ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  )
}

export const ProductVariant = ({
  productId,
  variantId,
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
        <LiveAddToCartButton productId={productId} variantId={variantId} />
      </Suspense>
    </dl>
  </Box>
)

// export const ProductVariant = compose(
//   graphql(CHECKOUT_GET_LOCAL_ID, { name: 'checkoutLocal' }),
//   graphql(CHECKOUT_LINE_ITEMS_REPLACE, {
//     name: 'checkoutLineItemsReplace',
//     options: ({ checkoutLocal }) => ({
//       variables: { checkoutId: get('checkoutId', checkoutLocal) },
//       refetchQueries: [
//         {
//           query: CHECKOUT_GET,
//           variables: { id: get('checkoutId', checkoutLocal) },
//         },
//       ],
//     }),
//   })
// )(ProductVariantBase)
