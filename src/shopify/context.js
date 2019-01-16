import React, { useReducer } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'

const initialState = {
  customerAccessToken: null,
  checkoutId: null,
}

const reducer = (state, action) => {
  const reduced = { ...state }
  const { type, payload } = action

  switch (type) {
    case 'SET_CUSTOMER_ACCESS_TOKEN':
      return {
        ...reduced,
        customerAccessToken: payload,
      }

    case 'SET_CHECKOUT_ID':
      return {
        ...reduced,
        checkoutId: payload,
      }

    case 'SIGN_OUT':
      return initialState

    default:
      return reduced
  }
}

export const ReducerContext = React.createContext()

export const ReducerProvider = ({ children, persist = true }) => {
  const hookedReducer = useReducer(reducer, initialState)

  return (
    <ReducerContext.Provider value={hookedReducer}>
      {children}
    </ReducerContext.Provider>
  )
}

// Root context provider for Apollo and local store.
export const ShopifyProvider = ({
  children,
  shopName,
  storefrontAccessToken,
  persist = true,
}) => {
  const apolloClient = new ApolloClient({
    uri: `https://${shopName}.myshopify.com/api/graphql`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    clientState: {
      defaults: {
        customerAccessToken: null,
      },
    },
  })

  return (
    <ReducerProvider persist={persist}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ReducerProvider>
  )
}
