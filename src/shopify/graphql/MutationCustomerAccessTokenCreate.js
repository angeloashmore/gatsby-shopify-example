import { gql } from 'apollo-boost'

import { FragmentCustomerAccessToken } from './FragmentCustomerAccessToken'
import { FragmentUserError } from './FragmentUserError'

export const MutationCustomerAccessTokenCreate = gql`
  mutation($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        ...FragmentUserError
      }
      customerAccessToken {
        ...FragmentCustomerAccessToken
      }
    }
  }

  ${FragmentCustomerAccessToken}
  ${FragmentUserError}
`
