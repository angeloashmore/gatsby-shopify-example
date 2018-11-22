import React from 'react'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from 'react-apollo'
import { compose, merge, omit } from 'lodash/fp'

import { clientState } from '../../src/state'

export default ({ element }, options) => {
  const cache = new InMemoryCache()

  persistCache({ cache, storage: window.localStorage })

  const client = new ApolloClient(
    compose(
      merge({
        clientState,
        cache,
      }),
      omit(['plugins'])
    )(options)
  )

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
