import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Query } from 'react-apollo'
import { get, cond, T, always } from 'lodash/fp'

import { GET_CUSTOMER_ACCESS_TOKEN } from 'src/queries'
import { Authenticated } from 'src/components/Authenticated'

const render = props => queryData => (
  <header {...props}>
    <h1>
      <Link to="/">{get('site.siteMetadata.title', queryData)}</Link>
    </h1>
    <nav>
      <ul>
        <li>
          <Link to="/products/">Products</Link>
        </li>
        <Authenticated>
          {({ isAuthenticated }) =>
            isAuthenticated ? (
              <li>
                <Link to="/">Sign Out</Link>
              </li>
            ) : (
              <li>
                <Link to="/sign-in/">Sign In</Link>
              </li>
            )
          }
        </Authenticated>
      </ul>
    </nav>
    <dl>
      <dt>customerAccessToken</dt>
      <dd>
        <Query query={GET_CUSTOMER_ACCESS_TOKEN}>
          {cond([
            [get('loading'), always('Loading...')],
            [get('error'), always('An error occurred!')],
            [get('data.customerAccessToken'), get('data.customerAccessToken')],
            [T, always('Not signed in')],
          ])}
        </Query>
      </dd>
    </dl>
  </header>
)

export const Header = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={render(props)}
  />
)
