import React, { Suspense } from 'react'

import { Layout } from 'src/components/Layout'
import { SignInForm } from 'src/components/SignInForm'

const SignInPage = () => {
  return (
    <Layout>
      <Suspense fallback="Loading&hellip;">
        <SignInForm />
      </Suspense>
    </Layout>
  )
}

export default SignInPage
