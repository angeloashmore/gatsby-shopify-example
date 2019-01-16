import React from 'react'

import { ShopifyProvider } from 'src/shopify'

export const wrapRootElement = ({ element }) => (
  <ShopifyProvider
    shopName={process.env.GATSBY_SHOPIFY_SHOP_NAME}
    storefrontAccessToken={process.env.GATSBY_SHOPIFY_ACCESS_TOKEN}
  >
    {element}
  </ShopifyProvider>
)
