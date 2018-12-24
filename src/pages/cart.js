import React from 'react'
import { Query } from 'react-apollo'
import { get } from 'lodash/fp'

import { CHECKOUT_GET_LOCAL_ID } from 'src/queries'
import { Heading, Text } from 'src/components/system'
import { Layout } from 'src/components/Layout'

const CartPage = ({ location }) => {
  return (
    <Layout>
      <Heading>Cart</Heading>
      <Query query={CHECKOUT_GET_LOCAL_ID}>
        {({ data }) => <Text>{get('checkoutId', data)}</Text>}
      </Query>
    </Layout>
  )
}

export default CartPage
