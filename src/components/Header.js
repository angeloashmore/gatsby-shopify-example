import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { get, compose, size } from 'lodash/fp'

import { useShopifyAuth } from 'src/shopify'
import { Flex, Box, Heading, Text, Link } from 'system'

const NavItem = ({ to, children, ...props }) => (
  <Box
    as="li"
    display="inline-block"
    mr={[2, 3]}
    boxStyle="lastNoMargin"
    {...props}
  >
    <Text as={Link} to={to} fontSize={['small', 'medium']}>
      {children}
    </Text>
  </Box>
)

export const Header = ({ checkoutLocal, checkout, ...props }) => {
  const { isSignedIn } = useShopifyAuth()

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
        <Flex
          as="header"
          alignItems={[null, 'flex-end']}
          borderBottom="2px solid"
          borderColor="black"
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          mb={[2, 3]}
          pb={[2, 3]}
          {...props}
        >
          <Heading as="h1" fontSize="large" fontWeight="normal" mb={[1, 0]}>
            <Link to="/">{get('site.siteMetadata.title', queryData)}</Link>
          </Heading>
          <Flex as="nav">
            <Box as="ul">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/products/">Products</NavItem>
              <NavItem to="/cart/">
                Cart (
                {compose(
                  size,
                  get('node.lineItems.edges')
                )(checkout)}
                )
              </NavItem>
              {isSignedIn ? (
                <>
                  <NavItem to="/account/">Account</NavItem>
                  <NavItem to="/sign-out/">Sign Out</NavItem>
                </>
              ) : (
                <NavItem to="/sign-in/">Sign In</NavItem>
              )}
            </Box>
          </Flex>
        </Flex>
      )}
    />
  )
}
