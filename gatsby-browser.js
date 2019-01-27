import React, { Suspense } from 'react'

import { ShopifyProviderWithContext } from 'src/shopify'

export const wrapRootElement = ({ element }) => (
  <Suspense fallback="Loading&hellip;">
    <ShopifyProviderWithContext
      shopName={process.env.GATSBY_SHOPIFY_SHOP_NAME}
      storefrontAccessToken={process.env.GATSBY_SHOPIFY_ACCESS_TOKEN}
    >
      {element}
    </ShopifyProviderWithContext>
  </Suspense>
)
