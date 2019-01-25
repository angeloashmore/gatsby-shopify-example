import { useContext } from 'react'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'
import { compose, get, find, merge, isEmpty } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import { MutationCheckoutCreate } from './graphql/MutationCheckoutCreate'
import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'
import { QueryCheckoutNode } from './graphql/QueryCheckoutNode'
import { QueryProductNode } from './graphql/QueryProductNode'

/***
 * useShopifyApolloClient
 *
 * Returns direct access to the Apollo client for arbitrary query execution.
 */
export { useApolloClient as useShopifyApolloClient }

/***
 * useShopifyReducer
 *
 * Returns the local reducer used for managing client-side data.
 */
export const useShopifyReducer = () => useContext(ReducerContext)

/***
 * useShopifyAuth
 *
 * Manages customer authentication. It keeps the customer's access token in
 * local state for other hooks to utlize. The token is also provided via this
 * hook for arbitrary use.
 */
export const useShopifyAuth = () => {
  const [state, dispatch] = useShopifyReducer()
  const mutationCustomerAccessTokenCreate = useMutation(
    MutationCustomerAccessTokenCreate
  )

  return {
    token: state.customerAccessToken,
    isSignedIn: Boolean(state.customerAccessToken),

    // Request a customer access token from Shopify and store it if successful.
    signIn: async (email, password) => {
      const result = await mutationCustomerAccessTokenCreate({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      const token = get(
        'data.customerAccessTokenCreate.customerAccessToken.accessToken',
        result
      )

      if (token) {
        dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: token })
        return true
      }

      return false
    },

    // Reset to initial state.
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

/***
 * useShopifyCheckout
 *
 * Manages checkout.
 */
export const useShopifyCheckout = () => {
  const [state, dispatch] = useShopifyReducer()

  // Nodes
  const checkoutId = get('checkoutId', state)
  const { data: checkoutData } = useQuery(QueryCheckoutNode, {
    variables: { id: checkoutId },
    skip: isEmpty(checkoutId),
  })
  const checkoutNode = get('node', checkoutData)

  // Mutations
  const mutationCheckoutCreate = useMutation(MutationCheckoutCreate)

  return {
    checkout: checkoutNode,
    actions: {
      // Creates a checkout and updates checkout-dependent queries. Includes no
      // line items by default. Sets the checkout ID to the global store.
      createCheckout: async options => {
        const result = await mutationCheckoutCreate({
          variables: {
            input: merge(options, {
              lineItems: [],
            }),
          },
        })

        const id = get('data.checkoutCreate.checkout.id', result)

        if (id) {
          dispatch({ type: 'SET_CHECKOUT_ID', payload: id })

          return true
        }

        return false
      },
    },
  }
}

/***
 * useShopifyProduct
 *
 * Provides product data for a given product ID.
 */
export const useShopifyProduct = (id, options) => {
  const { data, ...rest } = useQuery(
    QueryProductNode,
    merge(options, {
      variables: { id },
    })
  )

  return { product: get('node', data), ...rest }
}

/***
 * useShopifyProductVariant
 *
 * Provides product variant data for a given product ID and variant ID. Note
 * that both product and variant ID is required to query data.
 */
export const useShopifyProductVariant = (productId, variantId, options) => {
  const { product, ...rest } = useShopifyProduct(productId, options)

  return {
    productVariant: compose(
      find(['id', variantId]),
      getNodes,
      get('variants')
    )(product),
    ...rest,
  }
}
