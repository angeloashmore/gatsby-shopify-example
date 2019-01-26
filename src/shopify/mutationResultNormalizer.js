import { curry, get, isEmpty } from 'lodash/fp'

export const mutationResultNormalizer = curry(
  (rootPath = '', resourcePath = '', result) => {
    const root = get(rootPath, result)

    const checkoutUserErrors = get('checkoutUserErrors', root)
    if (!isEmpty(checkoutUserErrors))
      throw new Error(JSON.stringify(checkoutUserErrors))

    const customerUserErrors = get('customerUserErrors', root)
    if (!isEmpty(customerUserErrors))
      throw new Error(JSON.stringify(customerUserErrors))

    const userErrors = get('userErrors', root)
    if (!isEmpty(userErrors)) throw new Error(JSON.stringify(userErrors))

    // If no resource path is given, return true to signal success.
    return resourcePath ? get(resourcePath, root) : true
  }
)
