import React from 'react'
import { useShopifyCheckoutWithContext } from 'react-shopify-hooks'
import { get } from 'lodash/fp'

import { Heading, Text, Link } from 'system'
import { Button } from 'src/components/Button'
import { Layout } from 'src/components/Layout'

const CartPage = props => {
  const { checkout } = useShopifyCheckoutWithContext()

  return (
    <Layout>
      <Heading>Cart</Heading>
      <Text>{checkout ? checkout.id : 'none'}</Text>
      <Button as={Link} disabled={!checkout} to={get('webUrl', checkout)}>
        Checkout
      </Button>
    </Layout>
  )
}

export default CartPage
