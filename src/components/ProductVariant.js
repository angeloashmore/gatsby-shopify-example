import React from 'react'
import { graphql, Query } from 'react-apollo'
import { compose, get, find, cond, T, always, negate } from 'lodash/fp'

import {
  GET_PRODUCT,
  CHECKOUT_GET,
  CHECKOUT_GET_LOCAL_ID,
  CHECKOUT_LINE_ITEMS_REPLACE,
} from 'src/queries'
import { nodes } from 'system/helpers'

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

const ProductVariantBase = ({
  id,
  productHandle,
  title,
  price,
  checkoutLocal,
  checkoutLineItemsReplace,
  ...props
}) => {
  const addToCart = () => {
    checkoutLineItemsReplace({
      variables: {
        lineItems: [
          {
            variantId: id,
            quantity: 1,
          },
        ],
      },
    })
  }

  return (
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
            [T, always(<button onClick={addToCart}>Add to cart</button>)],
          ])}
        </LiveProductAvailability>
      </dl>
    </div>
  )
}

export const ProductVariant = compose(
  graphql(CHECKOUT_GET_LOCAL_ID, { name: 'checkoutLocal' }),
  graphql(CHECKOUT_LINE_ITEMS_REPLACE, {
    name: 'checkoutLineItemsReplace',
    options: ({ checkoutLocal }) => ({
      variables: { checkoutId: get('checkoutId', checkoutLocal) },
      refetchQueries: [
        {
          query: CHECKOUT_GET,
          variables: { id: get('checkoutId', checkoutLocal) },
        },
      ],
    }),
  })
)(ProductVariantBase)
