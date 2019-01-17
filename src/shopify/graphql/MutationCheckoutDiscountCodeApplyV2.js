import { gql } from 'apollo-boost'

import { FragmentUserError } from './FragmentUserError'

export const MutationCheckoutDiscountCodeApplyV2 = gql`
  mutation checkoutDiscountCodeApplyV2(
    $discountCode: String!
    $checkoutId: ID!
  ) {
    checkoutDiscountCodeApplyV2(
      discountCode: $discountCode
      checkoutId: $checkoutId
    ) {
      userErrors {
        ...FragmentUserError
      }
      checkoutUserErrors {
        ...FragmentCheckoutUserError
      }
      checkout {
        ...FragmentCheckout
      }
    }
  }
`
