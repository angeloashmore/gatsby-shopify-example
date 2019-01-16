import React from 'react'

import { useShopifyAuth } from 'src/shopify'
import { Redirect } from 'src/components/Redirect'

const SignOutPage = props => {
  const { signOut } = useShopifyAuth()

  signOut()

  return <Redirect to="/sign-in/" />
}

export default SignOutPage
