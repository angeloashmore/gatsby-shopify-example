import { gql } from 'apollo-boost'

export const MutationCheckoutCreate = gql`
  mutation($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
    }
  }
`
