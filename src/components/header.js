import React from 'react'
import { Link } from 'gatsby'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { get, cond, T, always } from 'lodash/fp'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/products/">Products</Link>
          </li>
          <li>
            <Link to="/sign-in/">Sign In</Link>
          </li>
        </ul>
      </nav>
      <dl>
        <dt>customerAccessToken</dt>
        <dd>
          <Query
            query={gql`
              query {
                customerAccessToken @client
              }
            `}
          >
            {cond([
              [get('loading'), always('Loading...')],
              [get('error'), always('An error occurred!')],
              [
                get('data.customerAccessToken'),
                get('data.customerAccessToken'),
              ],
              [T, always('Not signed in')],
            ])}
          </Query>
        </dd>
      </dl>
    </div>
  </div>
)

export default Header
