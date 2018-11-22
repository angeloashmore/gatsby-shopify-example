import React from 'react'
import { Mutation } from 'react-apollo'
import { get, isEmpty } from 'lodash/fp'

import { SIGN_IN } from 'src/queries'
import { CustomerQuery } from 'src/components/CustomerQuery'
import { Layout } from 'src/components/Layout'
import { Redirect } from 'src/components/Redirect'
import { SignInForm } from 'src/components/SignInForm'

const setCustomerAccessToken = (cache, { data }) => {
  const customerAccessToken = get(
    'customerAccessTokenCreate.customerAccessToken.accessToken',
    data
  )

  if (!isEmpty(customerAccessToken))
    cache.writeData({ data: { customerAccessToken } })
}

const SignInPage = () => {
  return (
    <Layout>
      <CustomerQuery>
        {({ isAuthenticated }) =>
          isAuthenticated && <Redirect to="/account/" />
        }
      </CustomerQuery>
      <Mutation mutation={SIGN_IN} update={setCustomerAccessToken}>
        {(signIn, { data }) => (
          <>
            <SignInForm
              onSubmit={async ({ email, password }, { setSubmitting }) => {
                await signIn({ variables: { input: { email, password } } })
                setSubmitting(false)
              }}
            />
          </>
        )}
      </Mutation>
    </Layout>
  )
}

export default SignInPage
