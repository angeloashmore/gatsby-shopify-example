import { gql } from 'apollo-boost'

import { FragmentProductVariant } from './FragmentProductVariant'

export const FragmentProductVariantWithProduct = gql`
  fragment FragmentProductVariantWithProduct on ProductVariant {
    ...VariantFragment
    product {
      id
    }
  }

  ${FragmentProductVariant}
`
