import React from 'react'

import { CustomerQuery } from 'src/components/CustomerQuery'
import { Redirect } from 'src/components/Redirect'

const SignOutPage = ({ ...props }) => (
  <CustomerQuery>
    {({ isAuthenticated, client }) => {
      if (isAuthenticated) {
        client.resetStore()
        client.cache.reset()
      }

      return <Redirect to="/sign-in/" />
    }}
  </CustomerQuery>
)

export default SignOutPage
