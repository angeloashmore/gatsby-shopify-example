import { useContext } from 'react'
import { compose, get, merge } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import {
  useShopifyCheckout,
  useShopifyCustomer,
  useShopifyCustomerAccessToken,
  useShopifyProductVariant,
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
      signIn: async (...args) => {
        const {
          accessToken,
          expiresAt,
          ...rest
        } = await createCustomerAccessToken(...args)

        dispatch({
          type: 'SET_CUSTOMER_ACCESS_TOKEN',
          payload: { accessToken, expiresAt },
        })

        return { accessToken, expiresAt, ...rest }
      },

      // Renews and sets the global customer access token.
      renewToken,

      // Deletes the global customer access token and resets the global state.
      signOut: async () => {
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

  // TODO: Add auto-create logic here.
  // Creates and sets a new global checkout.
  const createCheckoutWithContext = async (...args) => {
    const newCheckout = await createCheckout(...args)
    dispatch({ type: 'SET_CHECKOUT_ID', payload: newCheckout.id })
  }

  return merge(useShopifyCheckoutResult, {
    actions: {
      // Creates and sets a new global checkout.
      createCheckout: createCheckoutWithContext,
    },
  })
}

/***
 * useShopifyProductVariantWithContext
 *
 * useShopifyCheckout hooked up to global state. This provides convenient
 * global checkout-related functions.
 */
export const useShopifyProductVariantWithContext = variantId => {
  const [{ checkoutLineItems }, dispatch] = useShopifyReducer()
  const useShopifyProductVariantResult = useShopifyProductVariant(variantId)
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

/***
 * useShopifyCustomerWithContext
 *
 * useShopifyCustomer hooked up to global state.
 */
export const useShopifyCustomerWithContext = () => {
  const [{ customerAccessToken }, dispatch] = useShopifyReducer()
  const useShopifyCustomerResult = useShopifyCustomer(customerAccessToken)
  const {
    actions: { activateCustomer, resetCustomer, resetCustomerByUrl },
  } = useShopifyCustomerResult

  return merge(useShopifyCustomerResult, {
    actions: {
      // Activates the customer and sets the global customer access token.
      activateCustomer: async (...args) => {
        const { accessToken, expiresAt, ...rest } = await activateCustomer(
          ...args
        )

        dispatch({
          type: 'SET_CUSTOMER_ACCESS_TOKEN',
          payload: { accessToken, expiresAt },
        })

        return { accessToken, expiresAt, ...rest }
      },

      // Resets the customer and sets the global customer access token.
      resetCustomer: async (...args) => {
        const { accessToken, expiresAt, ...rest } = await resetCustomer(...args)

        dispatch({
          type: 'SET_CUSTOMER_ACCESS_TOKEN',
          payload: { accessToken, expiresAt },
        })

        return { accessToken, expiresAt, ...rest }
      },

      // Resets the customer and sets the global customer access token.
      resetCustomerByUrl: async (...args) => {
        const { accessToken, expiresAt, ...rest } = await resetCustomerByUrl(
          ...args
        )

        dispatch({
          type: 'SET_CUSTOMER_ACCESS_TOKEN',
          payload: { accessToken, expiresAt },
        })

        return { accessToken, expiresAt, ...rest }
      },
    },
  })
}
