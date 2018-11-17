import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { get } from 'lodash/fp'

import { Flex, Box, Heading, Text } from 'src/components/system'
import { Authenticated } from 'src/components/Authenticated'

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

const render = props => queryData => (
  <Flex
    as="header"
    alignItems={[null, 'center']}
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
        <Authenticated>
          {({ isAuthenticated }) =>
            isAuthenticated ? (
              <NavItem to="/">Sign Out</NavItem>
            ) : (
              <NavItem to="/sign-in/">Sign In</NavItem>
            )
          }
        </Authenticated>
      </Box>
    </Flex>
  </Flex>
)

export const Header = props => (
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
