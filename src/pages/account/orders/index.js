import React from 'react'
import { Router } from '@reach/router'

import { AccountLayout } from 'src/components/AccountLayout'

import AccountOrdersIndexPage from './_index'
import AccountOrdersShowPage from './_show'

const AccountOrdersPage = ({ location }) => {
  return (
    <AccountLayout>
      <Router>
        <AccountOrdersIndexPage path="/account/orders" />
        <AccountOrdersShowPage path="/account/orders/:orderId" />
      </Router>
    </AccountLayout>
  )
}

export default AccountOrdersPage
