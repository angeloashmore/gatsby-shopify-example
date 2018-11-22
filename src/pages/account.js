import React from 'react'

import { Heading } from 'src/components/system'
import { CustomerQuery } from 'src/components/CustomerQuery'
import { Layout } from 'src/components/Layout'
import { Redirect } from 'src/components/Redirect'

const AccountPage = ({ location }) => {
  return (
    <Layout>
      <CustomerQuery>
        {({ isAuthenticated }) =>
          !isAuthenticated && <Redirect to="/sign-in/" />
        }
      </CustomerQuery>
      <Heading>Account</Heading>
    </Layout>
  )
}

export default AccountPage
