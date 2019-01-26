import React from 'react'

import { Redirect } from 'src/components/Redirect'
import { useShopifyCustomerAccessTokenWithContext } from 'src/shopify'

export const AuthenticatedRoute = ({ to = '/sign-in/', ...props }) => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  return isSignedIn ? null : <Redirect to={to} />
}
