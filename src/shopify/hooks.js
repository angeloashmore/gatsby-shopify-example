import { useContext } from 'react'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'
import { compose, get, find, merge, isEmpty } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import { MutationCheckoutAttributesUpdateV2 } from './graphql/MutationCheckoutAttributesUpdateV2'
import { MutationCheckoutCreate } from './graphql/MutationCheckoutCreate'
import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'
import { MutationCustomerAccessTokenDelete } from './graphql/MutationCustomerAccessTokenDelete'
import { MutationCustomerAccessTokenRenew } from './graphql/MutationCustomerAccessTokenRenew'
import { QueryCheckoutNode } from './graphql/QueryCheckoutNode'
import { QueryProductNode } from './graphql/QueryProductNode'
import { mutationResultNormalizer } from './mutationResultNormalizer'

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
 * useShopifyProduct
 *
 * Provides product data for a given product ID.
 */
export const useShopifyProduct = id => {
  const { data, error } = useQuery(
    QueryProductNode,
    merge(options, {
      variables: { id },
    })
  )

  return { product: get('node', data), error }
}

/***
 * useShopifyProductVariant
 *
 * Provides product variant data for a given product ID and variant ID. Note
 * that both product and variant ID is required to query data.
 */
export const useShopifyProductVariant = (productId, variantId) => {
  const { product, error } = useShopifyProduct(productId)

  return {
    productVariant: compose(
      find(['id', variantId]),
      getNodes,
      get('variants')
    )(product),
    error,
  }
}

/***
 * useShopifyCustomerAccessToken
 *
 * Manages customer access token creation, renewal, and deletion.
 */
export const useShopifyCustomerAccessToken = () => {
  const mutationCustomerAccessTokenCreate = useMutation(
    MutationCustomerAccessTokenCreate
  )
  const mutationCustomerAccessTokenRenew = useMutation(
    MutationCustomerAccessTokenRenew
  )
  const mutationCustomerAccessTokenDelete = useMutation(
    MutationCustomerAccessTokenDelete
  )

  return {
    // Create a new customer access token. Returns the token.
    create: async (email, password) =>
      await mutationCustomerAccessTokenCreate({
        variables: {
          input: {
            email,
            password,
          },
        },
      }),

    // Renew the customer access token. Returns the renewed token.
    renew: async customerAccessToken =>
      await mutationCustomerAccessTokenRenew({
        variables: {
          customerAccessToken,
        },
      }),

    // Permanently delete the customer access token.
    delete: async customerAccessToken =>
      await mutationCustomerAccessTokenDelete({
        variables: {
          customerAccessToken,
        },
      }),
  }
}

/***
 * useShopifyCheckout
 *
 * Fetches a checkout using the provided checkout ID and provides actions for
 * that checkout.
 */
export const useShopifyCheckout = checkoutId => {
  // Nodes
  const { data: checkoutData } = useQuery(QueryCheckoutNode, {
    variables: { id: checkoutId },
    skip: Boolean(checkoutId),
  })
  const checkoutNode = get('node', checkoutData)

  // Mutations
  const mutationCheckoutCreate = useMutation(MutationCheckoutCreate)
  const mutationCheckoutAttributesUpdateV2 = useMutation(
    MutationCheckoutAttributesUpdateV2
  )

  return {
    // All checkout data. Data updates on successful actions.
    checkout: checkoutNode,

    // Error message if fetching checkout data failed.
    error,

    // Collection of functions related to the product variant.
    actions: {
      // Create a new checkout.
      createCheckout: async input => {
        const result = await mutationCheckoutCreate({
          variables: {
            input,
          },
        })

        return mutationResultNormalizer('checkoutCreate', 'checkout', result)
      },

      // Update the checkout attributes.
      attributesUpdate: async input => {
        const result = await mutationCheckoutAttributesUpdateV2({
          variables: {
            checkoutId,
            input,
          },
        })

        return mutationResultNormalizer('checkoutUpdate', 'checkout', result)
      },
    },
  }
}
