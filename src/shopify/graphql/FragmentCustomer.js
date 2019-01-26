import { gql } from 'apollo-boost'

import { FragmentMailingAddress } from './FragmentMailingAddress'

export const FragmentCustomer = gql`
  fragment FragmentCustomer on Customer {
    acceptsMarketing
    createdAt
    defaultAddress {
      ...FragmentMailingAddress
    }
    displayName
    email
    firstName
    id
    lastIncompleteCheckout {
      id
    }
    lastName
    phone
    tags
    updatedAt
  }

  ${FragmentMailingAddress}
`
