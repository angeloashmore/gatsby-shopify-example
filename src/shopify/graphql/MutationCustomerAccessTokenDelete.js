import { gql } from 'apollo-boost'

export const MutationCustomerAccessTokenDelete = gql`
  mutation($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      userErrors {
        ...FragmentUserError
      }
      deletedAccessToken
      deletedCustomerAccessTokenId
    }
  }
`
