import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_SHOP_NAME,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
})

export const defaultStoreContext = {
  client,
  checkout: { lineItems: [] },
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
}

const { Consumer, Provider } = React.createContext(defaultStoreContext)

export const withStoreContext = Component => props => (
  <Consumer>
    {context => <Component {...props} storeContext={context} />}
  </Consumer>
)

export { Consumer as StoreContextConsumer, Provider as StoreContextProvider }
