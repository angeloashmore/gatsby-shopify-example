import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { get } from 'lodash/fp'

import { Header } from 'src/components/Header'

const render = ({ children }) => queryData => (
  <>
    <Helmet title={get('site.siteMetadata.title', queryData)}>
      <html lang="en" />
    </Helmet>
    <Header />
    <main>{children}</main>
  </>
)

export const Layout = props => (
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
