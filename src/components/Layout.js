import React, { Suspense, useEffect } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { get } from 'lodash/fp'

import { useShopifyCheckout } from 'src/shopify'
import { theme } from 'src/theme'
import { SystemProvider, Box, Text } from 'system'
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

export const Layout = ({ children, ...props }) => {
  const [checkout, { createCheckout }] = useShopifyCheckout()

  useEffect(
    () => {
      if (!checkout) createCheckout()
      return
    },
    [checkout]
  )

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
            <Suspense fallback="Loading&hellip;">
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
            </Suspense>
          </SystemProvider>
        </>
      )}
    />
  )
}
