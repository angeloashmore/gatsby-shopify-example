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
export const useShopifyAuth = () => {
  const [{ customerAccessToken }, dispatch] = useShopifyReducer()
  const { customer, error } = useShopifyCustomer(customerAccessToken)
  const {
    createCustomerAccessToken,
    renewCustomerAccessToken,
    deleteCustomerAccessToken,
  } = useShopifyCustomerAccessToken()

  return {
    customer,
    error,
    customerAccessToken,
    isSignedIn: Boolean(customerAccessToken),
    actions: {
      signIn: async (email, password) => {
        const newToken = await createCustomerAccessToken()
        dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: newToken })
        return newToken
      },
      signOut: async (email, password) => {
        if (customerAccessToken)
          await deleteCustomerAccessToken(customerAccessToken)
        dispatch({ type: 'RESET' })
      },
      renewToken: async () => {
        const renewedToken = await renewCustomerAccessToken(customerAccessToken)
        dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: renewedToken })
        return renewedToken
      },
    },
  }
}

/***
 * useShopifyCheckout
 */
export const useShopifyCheckout = () => {
  const [{ checkoutId }, dispatch] = useShopifyReducer()
  const {
    checkout,
    error,
    actions: { createCheckout, ...restActions },
  } = useShopifyCheckout(checkoutId)

  return {
    checkout,
    error,
    actions: {
      // Creates and sets a new global checkout.
      createCheckout: async input => {
        const newCheckout = await createCheckout(input)
        dispatch({ type: 'SET_CHECKOUT_ID', payload: newCheckout.id })
      },
      ...restActions,
    },
  }
}

/***
 * useShopifyProductVariant
 */
export const useShopifyProductVariant = (productId, variantId) => {
  const [{ checkoutId, checkoutLineItems }, dispatch] = useShopifyReducer()
  const useShopifyProductVariantResult = useShopifyProductVariant(
    productId,
    variantId
  )
  const {
    actions: { lineItemsReplace },
  } = useShopifyCheckout(checkoutId)

  // TODO: Need a proper merge. useShopifyProductVariantResult.actions will be
  // overridden.
  return {
    ...useShopifyProductVariantResult,
    actions: {
      // Adds the product variant to the global checkout.
      addToCheckout: async (quantity = 1, customAttributes) => {
        // TODO: Need a proper merge w/ quantity checking
        const newLineItem = { variantId, quantity, customAttributes }
        const checkout = await lineItemsReplace([
          ...checkoutLineItems,
          newLineItem,
        ])
        // TODO: Get line items from checkout
        const lineItems = []
        dispatch({ type: 'SET_CHECKOUT_LINE_ITEMS', payload: lineItems })
      },
    },
  }
}
