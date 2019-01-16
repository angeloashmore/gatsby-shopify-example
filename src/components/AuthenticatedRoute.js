import React from 'react'

import { Redirect } from 'src/components/Redirect'
import { useShopifyAuth } from 'src/shopify'

export const AuthenticatedRoute = ({ to = '/sign-in/', ...props }) => {
  const { isSignedIn } = useShopifyAuth()

  return isSignedIn ? <Redirect to={to} /> : null
}
