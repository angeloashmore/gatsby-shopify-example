import React from 'react'
import { Mutation } from 'react-apollo'
import { get, isEmpty } from 'lodash/fp'

import { SIGN_IN } from 'src/queries'
import { Layout } from 'src/components/Layout'
import { SignInForm } from 'src/components/SignInForm'

const SignInPage = () => (
  <Layout>
    <Mutation
      mutation={SIGN_IN}
      update={(cache, { data }) => {
        const customerAccessToken = get(
          'customerAccessTokenCreate.customerAccessToken.accessToken',
          data
        )

        if (!isEmpty(customerAccessToken))
          cache.writeData({ data: { customerAccessToken } })
      }}
    >
      {(signIn, { data }) => (
        <>
          <SignInForm
            onSubmit={async ({ email, password }, { setSubmitting }) => {
              await signIn({ variables: { input: { email, password } } })
              setSubmitting(false)
            }}
          />
          <p>{JSON.stringify(data)}</p>
        </>
      )}
    </Mutation>
  </Layout>
)

export default SignInPage
