import { gql } from 'apollo-boost'

import { FragmentCustomer } from './FragmentCustomer'

export const QueryCustomerNode = gql`
  query($id: ID!) {
    node(id: $id) {
      ...FragmentCustomer
    }
  }

  ${FragmentCustomer}
`
