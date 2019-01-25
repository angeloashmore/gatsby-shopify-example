import { curry, get, isEmpty } from 'lodash/fp'

export const mutationResultNormalizer = curry(
  (rootPath = '', resourcePath = '', result) => {
    const root = get(rootPath, result)

    const checkoutUserErrors = get('checkoutUserErrors', root)
    if (!isEmpty(checkoutUserErrors))
      throw new Error(JSON.stringify(checkoutUserErrors))

    const userErrors = get('userErrors', root)
    if (!isEmpty(userErrors)) throw new Error(JSON.stringify(userErrors))

    return get(resourcePath, root)
  }
)
