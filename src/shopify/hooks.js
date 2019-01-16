import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'
import { compose, get, find, merge } from 'lodash/fp'

import { getNodes } from './lib'
import { QueryProductNode } from './graphql/QueryProductNode'
import { MutationCustomerAccessTokenCreate } from './graphql/MutationCustomerAccessTokenCreate'

export { useApolloClient as useShopifyApolloClient }

export const useShopifyProduct = (id, options) => {
  const { data, ...rest } = useQuery(
    QueryProductNode,
    merge(options, {
      variables: { id },
    })
  )

  return { product: get('node', data), ...rest }
}

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

export const useShopifyCustomer = options => {
  const customerAccessTokenCreate = useMutation(
    MutationCustomerAccessTokenCreate,
    options
  )

  const login = async (email, password) => {
    const result = await customerAccessTokenCreate({
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

    console.log(token)
  }

  return { login }
}
