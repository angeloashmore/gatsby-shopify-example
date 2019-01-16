import React from 'react'

import { useShopifyCheckout } from 'src/shopify'
import { Heading, Text } from 'system'
import { Layout } from 'src/components/Layout'

const CheckoutId = () => {
  const { hasCheckout, checkoutId } = useShopifyCheckout()

  return hasCheckout ? checkoutId : 'none'
}

const CartPage = props => {
  return (
    <Layout>
      <Heading>Cart</Heading>
      <Text>
        <CheckoutId />
      </Text>
    </Layout>
  )
}

export default CartPage
