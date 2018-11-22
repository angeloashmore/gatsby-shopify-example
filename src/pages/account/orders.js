import React from 'react'

import { Heading, Subheading } from 'src/components/system'
import { AccountNav } from 'src/components/AccountNav'
import { CustomerQuery } from 'src/components/CustomerQuery'
import { Layout } from 'src/components/Layout'
import { Redirect } from 'src/components/Redirect'

const AccountOrdersPage = ({ location }) => {
  return (
    <Layout>
      <CustomerQuery>
        {({ isAuthenticated }) =>
          !isAuthenticated && <Redirect to="/sign-in/" />
        }
      </CustomerQuery>
      <Heading>Account</Heading>
      <AccountNav />
      <Subheading>Orders</Subheading>
    </Layout>
  )
}

export default AccountOrdersPage
