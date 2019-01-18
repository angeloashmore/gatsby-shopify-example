import React from 'react'
import { get } from 'lodash/fp'

import { useShopifyCheckout } from 'src/shopify'
import { Heading, Text, Link } from 'system'
import { Button } from 'src/components/Button'
import { Layout } from 'src/components/Layout'

const CartPage = props => {
  const [checkout] = useShopifyCheckout()

  return (
    <Layout>
      <Heading>Cart</Heading>
      <Text>{checkout ? get('id', checkout) : 'none'}</Text>
      <Button as={Link} disabled={!checkout} to={get('webUrl', checkout)}>
        Checkout
      </Button>
    </Layout>
  )
}

export default CartPage
