import { useContext } from 'react'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'
import { compose, get, find, merge, isEmpty } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import { mutationResultNormalizer } from './mutationResultNormalizer'

import { QueryCheckoutNode } from './graphql/QueryCheckoutNode'
import { QueryProductNode } from './graphql/QueryProductNode'

import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'
import { MutationCustomerAccessTokenDelete } from './graphql/MutationCustomerAccessTokenDelete'
import { MutationCustomerAccessTokenRenew } from './graphql/MutationCustomerAccessTokenRenew'

import { MutationCheckoutAttributesUpdateV2 } from './graphql/MutationCheckoutAttributesUpdateV2'
import { MutationCheckoutCreate } from './graphql/MutationCheckoutCreate'
import { MutationCheckoutCustomerAssociateV2 } from './graphql/MutationCheckoutCustomerAssociateV2'
import { MutationCheckoutCustomerDisassociateV2 } from './graphql/MutationCheckoutCustomerDisassociateV2'
import { MutationCheckoutDiscountCodeApplyV2 } from './graphql/MutationCheckoutDiscountCodeApplyV2'
import { MutationCheckoutDiscountCodeRemove } from './graphql/MutationCheckoutDiscountCodeRemove'
import { MutationCheckoutEmailUpdateV2 } from './graphql/MutationCheckoutEmailUpdateV2'
import { MutationCheckoutGiftCardRemoveV2 } from './graphql/MutationCheckoutGiftCardRemoveV2'
import { MutationCheckoutGiftCardsAppend } from './graphql/MutationCheckoutGiftCardsAppend'
import { MutationCheckoutLineItemsReplace } from './graphql/MutationCheckoutLineItemsReplace'
import { MutationCheckoutShippingLineUpdate } from './graphql/MutationCheckoutShippingLineUpdate'

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
  const { data: checkoutData, error } = useQuery(QueryCheckoutNode, {
    variables: { id: checkoutId },
    skip: Boolean(checkoutId),
  })
  const checkoutNode = get('node', checkoutData)

  // Mutations
  const mutationCheckoutCreate = useMutation(MutationCheckoutCreate)
  const mutationCheckoutAttributesUpdateV2 = useMutation(
    MutationCheckoutAttributesUpdateV2
  )
  const mutationCheckoutCustomerAssociateV2 = useMutation(
    MutationCheckoutCustomerAssociateV2
  )
  const mutationCheckoutCustomerDisassociateV2 = useMutation(
    MutationCheckoutCustomerDisassociateV2
  )
  const mutationCheckoutDiscountCodeApplyV2 = useMutation(
    MutationCheckoutDiscountCodeApplyV2
  )
  const mutationCheckoutDiscountCodeRemove = useMutation(
    MutationCheckoutDiscountCodeRemove
  )
  const mutationCheckoutEmailUpdateV2 = useMutation(
    MutationCheckoutEmailUpdateV2
  )
  const mutationCheckoutGiftCardsAppend = useMutation(
    MutationCheckoutGiftCardsAppend
  )
  const mutationCheckoutGiftCardRemoveV2 = useMutation(
    MutationCheckoutGiftCardRemoveV2
  )
  const mutationCheckoutLineItemsReplace = useMutation(
    MutationCheckoutLineItemsReplace
  )
  const mutationCheckoutShippingAddressUpdateV2 = useMutation(
    MutationCheckoutShippingAddressUpdateV2
  )
  const mutationCheckoutShippingLineUpdate = useMutation(
    MutationCheckoutShippingLineUpdate
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
          variables: { input },
        })

        return mutationResultNormalizer('checkoutCreate', 'checkout', result)
      },

      // Update the checkout attributes.
      attributesUpdate: async input => {
        const result = await mutationCheckoutAttributesUpdateV2({
          variables: { checkoutId, input },
        })

        return mutationResultNormalizer('checkoutUpdate', 'checkout', result)
      },

      // Associate the checkout to a customer.
      customerAssociate: async customerAccessToken => {
        const result = await mutationCheckoutCustomerAssociateV2({
          variables: { checkoutId, customerAccessToken },
        })

        return mutationResultNormalizer(
          'checkoutCustomerAssociateV2',
          'checkout',
          result
        )
      },

      // Disssociate the checkout from any customer.
      customerDisassociate: async () => {
        const result = await mutationCheckoutCustomerDisassociateV2({
          variables: { checkoutId },
        })

        return mutationResultNormalizer(
          'checkoutCustomerDisassociateV2',
          'checkout',
          result
        )
      },

      // Apply a discount code to the checkout.
      discountCodeApply: async discountCode => {
        const result = await mutationCheckoutDiscountCodeApplyV2({
          variables: { checkoutId, discountCode },
        })

        return mutationResultNormalizer(
          'checkoutDiscountCodeApplyV2',
          'checkout',
          result
        )
      },

      // Remove any discount code from the checkout.
      discountCodeRemove: async () => {
        const result = await mutationCheckoutDiscountCodeRemove({
          variables: { checkoutId },
        })

        return mutationResultNormalizer(
          'checkoutDiscountCodeRemove',
          'checkout',
          result
        )
      },

      // Update the checkout's email address.
      emailUpdate: async email => {
        const result = await mutationCheckoutEmailUpdateV2({
          variables: { checkoutId, email },
        })

        return mutationResultNormalizer(
          'checkoutEmailUpdateV2',
          'checkout',
          result
        )
      },

      // Append gift card codes to the checkout.
      giftCardsAppend: async giftCardCodes => {
        const result = await mutationCheckoutGiftCardsAppend({
          variables: { checkoutId, giftCardCodes },
        })

        return mutationResultNormalizer(
          'checkoutGiftCardsAppend',
          'checkout',
          result
        )
      },

      // Remove the gift card code from the checkout.
      giftCardRemove: async appliedGiftCardId => {
        const result = await mutationCheckoutGiftCardRemoveV2({
          variables: { checkoutId, appliedGiftCardId },
        })

        return mutationResultNormalizer(
          'checkoutGiftCardRemoveV2',
          'checkout',
          result
        )
      },

      // Replace the checkout line items.
      lineItemsReplace: async lineItems => {
        const result = await mutationCheckoutLineItemsReplace({
          variables: { checkoutId, lineItems },
        })

        return mutationResultNormalizer(
          'checkoutLineItemsReplace',
          'checkout',
          result
        )
      },

      // Update the checkout's shipping address.
      shippingAddressUpdate: async shippingAddress => {
        const result = await mutationCheckoutShippingAddressUpdateV2({
          variables: { checkoutId, shippingAddress },
        })

        return mutationResultNormalizer(
          'checkoutShippingAddressUpdateV2',
          'checkout',
          result
        )
      },

      // Update the checkout's shipping line.
      shippingLineUpdate: async shippingRateHandle => {
        const result = await mutationCheckoutShippingLineUpdate({
          variables: { checkoutId, shippingRateHandle },
        })

        return mutationResultNormalizer(
          'checkoutShippingLineUpdate',
          'checkout',
          result
        )
      },
    },
  }
}
