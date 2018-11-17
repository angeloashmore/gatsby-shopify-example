import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { compose, merge, omit } from 'lodash/fp'

import { clientState } from '../../src/state'

export default ({ element }, options) => {
  const client = new ApolloClient(
    compose(
      merge({ clientState }),
      omit(['plugins'])
    )(options)
  )

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
