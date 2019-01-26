import { merge } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import {
  useShopifyCheckout,
  useShopifyCustomerAccessToken,
  useShopifyProductVariant,
  useShopifyReducer,
} from './hooks'

/***
 * useShopifyReducer
 *
 * Returns the reducer used for managing global state.
 */
export const useShopifyReducer = () => useContext(ReducerContext)

/***
 * useShopifyCustomerAccessTokenWithContext
 *
 * useShopifyCustomerAccessToken hooked up to global state. Customer access
 * tokens are stored in the global state to allow implicit access to the token
 * in other hooks.
 *
 * If autoRenew is true, this hook will automatically renew the token if the
 * saved token expires within 1 day.
 */
export const useShopifyCustomerAccessTokenWithContext = (autoRenew = true) => {
  const [{ customerAccessToken }, dispatch] = useShopifyReducer()
  const useShopifyCustomerResult = useShopifyCustomer(customerAccessToken)
  const {
    createCustomerAccessToken,
    renewCustomerAccessToken,
    deleteCustomerAccessToken,
  } = useShopifyCustomerAccessToken()

  // Renews and sets the global customer access token.
  const renewToken = async () => {
    const { accessToken, expiresAt, ...rest } = await renewCustomerAccessToken(
      customerAccessToken
    )

    dispatch({
      type: 'SET_CUSTOMER_ACCESS_TOKEN',
      payload: { accessToken, expiresAt },
    })

    return { accessToken, expiresAt, ...rest }
  }

  // TODO: Add auto-renew logic here.
  // - If wihin 1 day (duration undecided) of expiration, renew token

  return merge(useShopifyCustomerResult, {
    customerAccessToken,
    isSignedIn: Boolean(customerAccessToken),
    actions: {
      // Creates and sets the global customer access token.
      signIn: async (email, password) => {
        const {
          accessToken,
          expiresAt,
          ...rest
        } = await createCustomerAccessToken()

        dispatch({
          type: 'SET_CUSTOMER_ACCESS_TOKEN',
          payload: { accessToken, expiresAt },
        })

        return { accessToken, expiresAt, ...rest }
      },

      // Renews and sets the global customer access token.
      renewToken,

      // Deletes the global customer access token and resets the global state.
      signOut: async (email, password) => {
        if (customerAccessToken)
          await deleteCustomerAccessToken(customerAccessToken)
        dispatch({ type: 'RESET' })
      },
    },
  })
}

/***
 * useShopifyCheckoutWithContext
 *
 * useShopifyCheckout hooked up to global state. A single checkout is stored
 * globally to allow implicit access to the checkout in other hooks.
 */
export const useShopifyCheckoutWithContext = (autoCreate = true) => {
  const [{ checkoutId }, dispatch] = useShopifyReducer()
  const useShopifyCheckoutResult = useShopifyCheckout(checkoutId)
  const {
    actions: { createCheckout },
  } = useShopifyCheckoutResult

  // Creates and sets a new global checkout.
  const createCheckout = async input => {
    const newCheckout = await createCheckout(input)
    dispatch({ type: 'SET_CHECKOUT_ID', payload: newCheckout.id })
  }

  return merge(useShopifyCheckoutResult, {
    actions: {
      // Creates and sets a new global checkout.
      createCheckout,
    },
  })
}

/***
 * useShopifyProductVariantWithContext
 *
 * useShopifyCheckout hooked up to global state. This provides convenient
 * global checkout-related functions.
 */
export const useShopifyProductVariantWithContext = (productId, variantId) => {
  const [{ checkoutLineItems }, dispatch] = useShopifyReducer()
  const useShopifyProductVariantResult = useShopifyProductVariant(
    productId,
    variantId
  )
  const {
    actions: { lineItemsReplace },
  } = useShopifyCheckout()

  return merge(useShopifyProductVariantResult, {
    actions: {
      // Adds the product variant to the global checkout.
      addToCheckout: async (quantity = 1, customAttributes) => {
        // TODO: Need a proper merge w/ quantity checking
        const newLineItem = { variantId, quantity, customAttributes }
        const mergedLineItems = [...checkoutLineItems, newLineItem]
        const checkout = await lineItemsReplace(mergedLineItems)

        const lineItems = compose(
          getNodes,
          get('lineItems')
        )(checkout)

        dispatch({ type: 'SET_CHECKOUT_LINE_ITEMS', payload: lineItems })
      },
    },
  })
}
