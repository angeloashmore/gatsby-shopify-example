import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { get } from 'lodash/fp'

import { theme } from 'src/theme'
import { Box, Text } from 'src/components/system'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'

import 'minireset.css'
import 'inter-ui'
import 'src/index.css'

const render = ({ children }) => queryData => (
  <>
    <Helmet title={get('site.siteMetadata.title', queryData)}>
      <html lang="en" />
    </Helmet>
    <ThemeProvider theme={theme}>
      <Text
        as="div"
        color="black"
        fontFamily="sans"
        fontSize="medium"
        fontWeight="medium"
        lineHeight="solid"
        p={[2, 4]}
      >
        <Header />
        <Box as="main">{children}</Box>
        <Footer />
      </Text>
    </ThemeProvider>
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
