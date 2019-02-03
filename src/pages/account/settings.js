import React from 'react'
import { useShopifyCustomerWithContext } from 'react-shopify-hooks'

import { Text } from 'system'
import { AccountLayout } from 'src/components/AccountLayout'
import { Subheading } from 'src/components/Subheading'

const AccountSettingsPage = ({ location }) => {
  const { customer } = useShopifyCustomerWithContext()

  return (
    <AccountLayout>
      <Subheading>Settings</Subheading>
      <Text>{JSON.stringify(customer)}</Text>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{customer.displayName}</td>
          </tr>
        </tbody>
      </table>
    </AccountLayout>
  )
}

export default AccountSettingsPage
