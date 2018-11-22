import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Query } from 'react-apollo'
import { get } from 'lodash/fp'

import { GET_CUSTOMER } from 'src/queries'
import { Flex, Box, Heading, Text } from 'src/components/system'
import { CustomerQuery } from 'src/components/CustomerQuery'
import { Link } from 'src/components/Link'

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
        <NavItem to="/cart/">Cart</NavItem>
        <CustomerQuery>
          {({ isAuthenticated, customerAccessToken }) =>
            isAuthenticated ? (
              <>
                <NavItem to="/account/">Account</NavItem>
                <Query query={GET_CUSTOMER} variables={{ customerAccessToken }}>
                  {({ data }) => (
                    <NavItem to="/sign-out/">
                      Sign Out ({get('customer.displayName', data)})
                    </NavItem>
                  )}
                </Query>
              </>
            ) : (
              <NavItem to="/sign-in/">Sign In</NavItem>
            )
          }
        </CustomerQuery>
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
