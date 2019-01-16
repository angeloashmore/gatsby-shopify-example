import React, { Suspense } from 'react'

import { useShopifyAuth } from 'src/shopify'
import { Layout } from 'src/components/Layout'
import { Redirect } from 'src/components/Redirect'
import { SignInForm } from 'src/components/SignInForm'

const RedirectIfSignedIn = () => {
  const { isSignedIn } = useShopifyAuth()

  return isSignedIn ? <Redirect to="/account/" /> : null
}

const SignInPage = () => (
  <Layout>
    <RedirectIfSignedIn />
    <Suspense fallback="Loading&hellip;">
      <SignInForm />
    </Suspense>
  </Layout>
)

export default SignInPage
