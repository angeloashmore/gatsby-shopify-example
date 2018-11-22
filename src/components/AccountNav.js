import React from 'react'

import { Box, Text } from 'src/components/system'
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

export const AccountNav = props => (
  <Box as="nav" bg="black" color="cream" p={2} my={3} {...props}>
    <Box as="ul">
      <NavItem to="/account/orders/">Orders</NavItem>
      <NavItem to="/account/addresses/">Addresses</NavItem>
      <NavItem to="/account/settings/">Settings</NavItem>
    </Box>
  </Box>
)
