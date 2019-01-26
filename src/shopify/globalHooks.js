import { merge } from 'lodash/fp'

import { getNodes } from './lib'
import { ReducerContext } from './context'
import { useShopifyCustomerAccessToken } from './hooks'

/***
 * useShopifyReducer
 *
 * Returns the local reducer used for managing client-side data.
 */
export const useShopifyReducer = () => useContext(ReducerContext)

/***
 * useShopifyAuth
 */
export const useShopifyAuth = (autoRenew = true) => {
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
 * useShopifyCheckout
 */
export const useShopifyCheckout = () => {
  const [{ checkoutId }, dispatch] = useShopifyReducer()
  const useShopifyCheckoutResult = useShopifyCheckoutLowLevel(checkoutId)
  const {
    actions: { createCheckout },
  } = useShopifyCheckoutResult

  return merge(useShopifyCheckoutResult, {
    actions: {
      // Creates and sets a new global checkout.
      createCheckout: async input => {
        const newCheckout = await createCheckout(input)
        dispatch({ type: 'SET_CHECKOUT_ID', payload: newCheckout.id })
      },
    },
  })
}

/***
 * useShopifyProductVariant
 */
export const useShopifyProductVariant = (productId, variantId) => {
  const [{ checkoutLineItems }, dispatch] = useShopifyReducer()
  const useShopifyProductVariantResult = useShopifyProductVariantLowLevel(
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
