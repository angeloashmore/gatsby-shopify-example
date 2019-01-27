import React, { useEffect } from 'react'

import { useShopifyCustomerAccessTokenWithContext } from 'src/shopify'
import { useAuthenticatedRoute } from 'src/hooks'
import { Heading } from 'src/components/Heading'
import { Layout } from 'src/components/Layout'

const SignOutPage = props => {
  useAuthenticatedRoute('/')

  const {
    actions: { signOut },
  } = useShopifyCustomerAccessTokenWithContext()

  useEffect(() => {
    signOut()
  }, [])

  return (
    <Layout>
      <Heading>Signing out&hellip;</Heading>
    </Layout>
  )
}

export default SignOutPage
