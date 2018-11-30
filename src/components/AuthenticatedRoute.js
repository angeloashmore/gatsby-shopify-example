import React from 'react'

import { CustomerQuery } from 'src/components/CustomerQuery'
import { Redirect } from 'src/components/Redirect'

export const AuthenticatedRoute = ({ to = '/sign-in/', ...props }) => (
  <CustomerQuery {...props}>
    {({ isAuthenticated }) => !isAuthenticated && <Redirect to={to} />}
  </CustomerQuery>
)
