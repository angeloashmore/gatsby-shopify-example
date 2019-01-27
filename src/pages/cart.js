import React from 'react'
import { get } from 'lodash/fp'

import { useShopifyCheckoutWithContext } from 'src/shopify'
import { Heading, Text, Link } from 'system'
import { Button } from 'src/components/Button'
import { Layout } from 'src/components/Layout'

const CartPage = props => {
  const { checkout } = useShopifyCheckoutWithContext()

  return (
    <Layout>
      <Heading>Cart</Heading>
      <Text>{checkout ? checkout.id : 'none'}</Text>
      <Button as={Link} disabled={!checkout} to={checkout.webUrl}>
        Checkout
      </Button>
    </Layout>
  )
}

export default CartPage
