import React from 'react'

import { Redirect } from 'src/components/Redirect'
import { useShopifyAuth } from 'src/shopify'

export const UnauthenticatedRoute = ({ to = '/', ...props }) => {
  const { isSignedIn } = useShopifyAuth()

  return isSignedIn ? <Redirect to={to} /> : null
}
