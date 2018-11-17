import { graphql } from 'react-apollo'
import { compose, get } from 'lodash/fp'

import { GET_CUSTOMER_ACCESS_TOKEN } from 'src/queries'

const render = ({ children, data, ...props }) =>
  children({
    isAuthenticated: compose(
      Boolean,
      get('customerAccessToken')
    )(data),
  })

export const Authenticated = graphql(GET_CUSTOMER_ACCESS_TOKEN)(render)
