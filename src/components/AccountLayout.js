import React from 'react'

import { useAuthenticatedRoute } from 'src/hooks'
import { Heading } from 'system'
import { AccountNav } from 'src/components/AccountNav'
import { AuthenticatedRoute } from 'src/components/AuthenticatedRoute'
import { Layout } from 'src/components/Layout'

export const AccountLayout = ({ children, ...props }) => {
  useAuthenticatedRoute()

  return (
    <Layout {...props}>
      <Heading>Account</Heading>
      <AccountNav />
      {children}
    </Layout>
  )
}
