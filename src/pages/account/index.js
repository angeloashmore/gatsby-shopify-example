import React from 'react'

import { useShopifyCustomerWithContext } from 'src/shopify'
import { Subheading } from 'system'
import { AccountLayout } from 'src/components/AccountLayout'

const AccountPage = ({ location }) => {
  const { customer, error } = useShopifyCustomerWithContext()

  return (
    <AccountLayout>
      <Subheading>Account index page</Subheading>
    </AccountLayout>
  )
}

export default AccountPage
