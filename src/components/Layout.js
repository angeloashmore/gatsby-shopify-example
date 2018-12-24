import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { graphql as graphqlApollo } from 'react-apollo'
import Component from '@reach/component-component'
import { get, compose, isEmpty } from 'lodash/fp'

import {
  CHECKOUT_GET_LOCAL_ID,
  CHECKOUT_CREATE,
  CHECKOUT_GET,
} from 'src/queries'
import { theme } from 'src/theme'
import { Box, Text } from 'src/components/system'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'

import 'minireset.css'
import 'inter-ui'

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${p => p.theme.colors.cream};
    overflow-x: hidden;
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
`

const didMount = ({ props: { checkoutLocal, checkoutCreate } }) => {
  if (
    compose(
      isEmpty,
      get('checkoutId')
    )(checkoutLocal)
  )
    checkoutCreate({ variables: { input: { lineItems: [] } } })
}

const render = ({ children, ...props }) => queryData => (
  <Component didMount={didMount} {...props}>
    <>
      <Helmet title={get('site.siteMetadata.title', queryData)}>
        <html lang="en" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Text
            as="div"
            color="black"
            fontFamily="sans"
            fontSize="medium"
            fontWeight="medium"
            lineHeight="copy"
            p={[2, 4]}
          >
            <Header />
            <Box as="main">{children}</Box>
            <Footer />
          </Text>
        </>
      </ThemeProvider>
    </>
  </Component>
)

const LayoutBase = props => (
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

export const Layout = compose(
  graphqlApollo(CHECKOUT_GET_LOCAL_ID, {
    name: 'checkoutLocal',
  }),
  graphqlApollo(CHECKOUT_CREATE, {
    name: 'checkoutCreate',
    options: {
      update: (cache, { data }) => {
        const checkoutId = get('checkoutCreate.checkout.id', data)

        if (!isEmpty(checkoutId))
          cache.writeData({ data: { checkoutId: checkoutId } })
      },
    },
  }),
  graphqlApollo(CHECKOUT_GET, {
    name: 'checkout',
    skip: ({ checkoutLocal }) =>
      compose(
        isEmpty,
        get('checkoutId')
      )(checkoutLocal),
    options: ({ checkoutLocal }) => ({
      variables: { id: get('checkoutId', checkoutLocal) },
    }),
  })
)(LayoutBase)
