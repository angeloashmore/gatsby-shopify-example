import React, { Suspense, useEffect } from 'react'
import { navigate } from 'gatsby'

import { useShopifyCustomerAccessTokenWithContext } from 'src/shopify'
import { Layout } from 'src/components/Layout'
import { SignInForm } from 'src/components/SignInForm'

const SignInPage = () => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  useEffect(
    () => {
      if (isSignedIn) navigate('/account/')
    },
    [isSignedIn]
  )

  return (
    <Layout>
      <Suspense fallback="Loading&hellip;">
        <SignInForm />
      </Suspense>
    </Layout>
  )
}

export default SignInPage
