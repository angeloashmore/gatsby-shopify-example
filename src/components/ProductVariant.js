import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { compose, get, find, cond, T, always, negate } from 'lodash/fp'

import { nodes } from 'src/helpers'

const GET_PRODUCT = gql`
  query($handle: String!) {
    shop {
      productByHandle(handle: $handle) {
        variants(first: 250) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
`

const LiveProductAvailability = ({ productHandle, variantId, children }) => {
  const getAvailableForSale = compose(
    get('availableForSale'),
    find(['id', variantId]),
    nodes,
    get('shop.productByHandle.variants')
  )

  return (
    <Query query={GET_PRODUCT} variables={{ handle: productHandle }}>
      {({ loading, error, data }) =>
        children({
          loading,
          error,
          availableForSale: getAvailableForSale(data),
        })
      }
    </Query>
  )
}

export const ProductVariant = ({
  id,
  productHandle,
  title,
  price,
  ...props
}) => (
  <div {...props}>
    <h4>{title}</h4>
    <dl>
      <dt>Price</dt>
      <dd>${price}</dd>
      <LiveProductAvailability productHandle={productHandle} variantId={id}>
        {cond([
          [get('loading'), always('Checking availability...')],
          [get('error'), always('There was an error!')],
          [negate(get('availableForSale')), always('Out of stock')],
          [T, always(<button>Add to cart</button>)],
        ])}
      </LiveProductAvailability>
    </dl>
  </div>
)
