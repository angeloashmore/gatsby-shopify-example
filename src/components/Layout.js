import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { get } from 'lodash/fp'

import { theme } from 'src/theme'
import { SystemProvider, Box, Text } from 'system'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { ShopifyProvider } from 'src/shopify'

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

const render = ({ children, ...props }) => queryData => (
  <>
    <Helmet title={get('site.siteMetadata.title', queryData)}>
      <html lang="en" />
    </Helmet>
    <SystemProvider theme={theme}>
      <ShopifyProvider
        shopName={process.env.GATSBY_SHOPIFY_SHOP_NAME}
        storefrontAccessToken={process.env.GATSBY_SHOPIFY_ACCESS_TOKEN}
      >
        <>
          <GlobalStyle />
          <Text
            as="div"
            color="black"
            fontFamily="sans"
            fontSize="normal"
            fontWeight="medium"
            lineHeight="copy"
            p={[2, 4]}
          >
            <Header />
            <Box as="main">{children}</Box>
            <Footer />
          </Text>
        </>
      </ShopifyProvider>
    </SystemProvider>
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
