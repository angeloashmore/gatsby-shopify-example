import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { useShopifyCheckoutWithContext } from 'react-shopify-hooks'
import { get } from 'lodash/fp'

import { theme } from 'src/theme'
import { SystemProvider, Box, Text } from 'system'
import { DevRefreshButton } from 'src/components/DevRefreshButton'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'

import 'minireset.css'
import 'inter-ui'
import 'typeface-roboto-mono'

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

export const Layout = props => {
  // useShopifyCheckoutWithContext()

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={queryData => (
        <>
          <Helmet
            titleTemplate={`%s – ${get('site.siteMetadata.title', queryData)}`}
            defaultTitle={get('site.siteMetadata.title', queryData)}
          >
            <html lang="en" />
            <meta
              name="description"
              content={get('site.siteMetadata.description', queryData)}
            />
          </Helmet>
          <SystemProvider theme={theme}>
            <>
              <GlobalStyle />
              <Text
                color="black"
                fontFamily="sans"
                fontSize="normal"
                fontWeight="normal"
                lineHeight="copy"
                letterSpacing={-0.5}
              >
                {process.env.NODE_ENV === 'development' && <DevRefreshButton />}
                <Header />
                <Box as="main" {...props} />
                <Footer />
              </Text>
            </>
          </SystemProvider>
        </>
      )}
    />
  )
}
