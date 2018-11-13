import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { get, isEmpty } from 'lodash/fp'

import Layout from 'src/components/layout'
import { SignInForm } from 'src/components/SignInForm'

const SIGN_IN = gql`
  mutation($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`

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
