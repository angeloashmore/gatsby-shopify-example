import React from 'react'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from 'react-apollo'
import { compose, merge, omit } from 'lodash/fp'

import { isBrowser } from '../../src/helpers'
import { clientState } from '../../src/state'

export default ({ element }, options) => {
  const cache = new InMemoryCache()

  // Skip cache persistence if not in the browser. This prevents the build from
  // throwing an error since window does not exist on the server.
  if (isBrowser) persistCache({ cache, storage: window.localStorage })

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
