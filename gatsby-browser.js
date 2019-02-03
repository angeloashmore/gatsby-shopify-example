import React from 'react'
import { ShopifyProviderWithContext } from 'react-shopify-hooks'

export const wrapRootElement = ({ element }) => (
  <ShopifyProviderWithContext
    shopName={process.env.GATSBY_SHOPIFY_SHOP_NAME}
    storefrontAccessToken={process.env.GATSBY_SHOPIFY_ACCESS_TOKEN}
  >
    {element}
  </ShopifyProviderWithContext>
)
