import React from 'react'

import { Heading } from 'system'
import { AccountNav } from 'src/components/AccountNav'
import { Layout } from 'src/components/Layout'

export const AccountLayout = ({ children, ...props }) => {
  return (
    <Layout {...props}>
      <Heading>Account</Heading>
      <AccountNav />
      {children}
    </Layout>
  )
}
