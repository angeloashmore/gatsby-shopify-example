import React from 'react'

import { useShopifyCheckout } from 'src/shopify'
import { Heading, Text, Link } from 'system'
import { Button } from 'src/components/Button'
import { Layout } from 'src/components/Layout'

const CartPage = props => {
  const { hasCheckout, checkoutId, webUrl } = useShopifyCheckout()

  return (
    <Layout>
      <Heading>Cart</Heading>
      <Text>{hasCheckout ? checkoutId : 'none'}</Text>
      <Button as={Link} disabled={!hasCheckout} to={webUrl}>
        Checkout
      </Button>
    </Layout>
  )
}

export default CartPage
