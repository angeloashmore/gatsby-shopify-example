import React from 'react'
// import {
//   useShopifyCustomerAccessTokenWithContext,
//   useShopifyCustomerWithContext,
// } from 'react-shopify-hooks'
import { isPathActive } from 'helpers'

import { useLocation } from 'src/hooks'

import { Box, Grid, Flex, Text, Link } from 'system'

const NavItem = ({ to, children, ...props }) => {
  const location = useLocation()
  const isActive = isPathActive(to, location)

  return (
    <Box
      as="li"
      borderColor={isActive ? 'accent' : 'transparent'}
      borderTop={2}
      {...props}
    >
      <Link
        to={to}
        display="block"
        fontWeight="bold"
        height="100%"
        lineHeight="tight"
        pt="calc(1rem - 2px)"
        pb={2}
        css={`
          text-transform: lowercase;

          &:hover {
            color: ${p => p.theme.colors.gray};
          }
        `}
      >
        <Flex height="100%" alignItems="flex-end">
          {children}
        </Flex>
      </Link>
    </Box>
  )
}

export const Header = ({ checkoutLocal, checkout, ...props }) => {
  // const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()
  // const { customer } = useShopifyCustomerWithContext()

  return (
    <Text
      as="header"
      bg="black"
      color="white"
      fontSize={['normal', null, 'large']}
      fontWeight="heavy"
      px={2}
    >
      <Grid gridTemplateColumns="repeat(4, 1fr)" gridColumnGap={2}>
        <Link to="/">
          <Text
            as="h1"
            borderColor="accent"
            borderTop={2}
            fontWeight="inherit"
            lineHeight="tight"
            pb={2}
            pt="calc(1rem - 2px)"
            textStyle="lowercase"
          >
            Standards
            <br />
            Manual
          </Text>
        </Link>
        <Box as="nav" gridColumn="span 3">
          <Grid
            as="ul"
            height="100%"
            gridTemplateColumns="repeat(6, 1fr)"
            gridColumnGap={2}
          >
            <NavItem to="/titles/">Titles</NavItem>
            <NavItem to="/shop/">Shop</NavItem>
            <NavItem to="/visit/" display={['none', 'block']}>
              Visit
            </NavItem>
            <NavItem to="/about/" display={['none', 'block']}>
              About
            </NavItem>
            <NavItem to="/news/" display={['none', 'block']}>
              News
            </NavItem>
          </Grid>
        </Box>
      </Grid>
    </Text>
  )
}
