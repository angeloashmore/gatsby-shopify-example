import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

export default ({ element }, options) => {
  // Automatically injected by Gatsby, but unsupported by Apollo Client
  delete options.plugins

  const client = new ApolloClient(options)

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
