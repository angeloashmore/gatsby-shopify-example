import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { get } from 'lodash/fp'

import { Box, Flex, Text, Link } from 'system'

const NavItem = ({ to, children, ...props }) => (
  <Box
    as="li"
    display="inline-block"
    mr={[2, 3]}
    boxStyle="lastNoMargin"
    {...props}
  >
    <Text as={Link} to={to} fontSize="tiny">
      {children}
    </Text>
  </Box>
)

const render = props => queryData => (
  <Flex
    alignItems="center"
    borderTop="2px solid"
    borderColor="black"
    justifyContent="space-between"
    mt={[2, 3]}
    pt={[2, 3]}
  >
    <Text fontSize="tiny">
      {get('site.siteMetadata.title', queryData)}.{' '}
      <Link
        display="inline-block"
        to="https://github.com/angeloashmore/gatsby-shopify-example"
      >
        View on GitHub
      </Link>
      .
    </Text>
    <Box as="ul">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/products/">Products</NavItem>
    </Box>
  </Flex>
)

export const Footer = props => (
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
