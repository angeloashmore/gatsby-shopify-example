import React, { Suspense } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { get } from 'lodash/fp'

import { useShopifyCheckoutWithContext } from 'src/shopify'
import { theme } from 'src/theme'
import { SystemProvider, Box, Text } from 'system'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { ShopifyReducerViewer } from 'src/components/ShopifyReducerViewer'

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

export const Layout = ({ children, ...props }) => {
  useShopifyCheckoutWithContext()

  return (
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
      render={queryData => (
        <>
          <Helmet title={get('site.siteMetadata.title', queryData)}>
            <html lang="en" />
          </Helmet>
          <SystemProvider theme={theme}>
            <>
              <GlobalStyle />
              <Text
                as="div"
                color="black"
                fontFamily="sans"
                fontSize="normal"
                fontWeight="medium"
                lineHeight="copy"
              >
                <Suspense fallback="Loading&hellip;">
                  <ShopifyReducerViewer />
                  <Box p={[2, 4]}>
                    <Header />
                    <Box as="main">{children}</Box>
                    <Footer />
                  </Box>
                </Suspense>
              </Text>
            </>
          </SystemProvider>
        </>
      )}
    />
  )
}
