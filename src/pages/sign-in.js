import React, { Suspense } from 'react'

import { useUnauthenticatedRoute } from 'src/hooks'
import { Layout } from 'src/components/Layout'
import { SignInForm } from 'src/components/SignInForm'

const SignInPage = () => {
  // useUnauthenticatedRoute()

  return (
    <Layout>
      <Suspense fallback="Loading&hellip;">
        <SignInForm />
      </Suspense>
    </Layout>
  )
}

export default SignInPage
