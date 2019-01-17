import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import { useShopifyAuth } from 'src/shopify'
import { Heading } from 'src/components/Heading'
import { Layout } from 'src/components/Layout'

const SignOutPage = props => {
  const { signOut } = useShopifyAuth()

  useEffect(() => {
    signOut()
    navigate('/')
  }, [])

  return (
    <Layout>
      <Heading>Signing out&hellip;</Heading>
    </Layout>
  )
}

export default SignOutPage
