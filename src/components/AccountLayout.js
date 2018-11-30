import React from 'react'

import { Heading } from 'src/components/system'
import { AccountNav } from 'src/components/AccountNav'
import { AuthenticatedRoute } from 'src/components/AuthenticatedRoute'
import { Layout } from 'src/components/Layout'

export const AccountLayout = ({ children, ...props }) => (
  <Layout {...props}>
    <AuthenticatedRoute />
    <Heading>Account</Heading>
    <AccountNav />
    {children}
  </Layout>
)
