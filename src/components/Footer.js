import React from 'react'

import { Box, Grid, Text, Link } from 'system'
import { Subheading } from 'src/components/Subheading'

const NavItem = ({ to, children, ...props }) => (
  <Box as="li" boxStyle="lastNoMargin" {...props}>
    <Link
      to={to}
      css={`
        text-transform: lowercase;

        &:hover {
          color: ${p => p.theme.colors.accent};
        }
      `}
    >
      {children}
    </Link>
  </Box>
)

const Section = ({
  singleColumn = false,
  forceBorderTopAlways = false,
  ...props
}) => (
  <Grid
    alignContent="start"
    alignItems="start"
    borderColor="white"
    borderTop={forceBorderTopAlways ? 2 : [2, null, 0]}
    gridColumnGap={4}
    gridRowGap={[3, null, 2]}
    gridTemplateColumns={singleColumn ? '1fr' : ['repeat(2, 1fr)', null, '1fr']}
    pt={1}
    {...props}
  />
)

const Line = props => (
  <Box
    bg="white"
    display={['none', null, 'block']}
    gridColumn="1 / -1"
    height={2}
    {...props}
  />
)

export const Footer = props => (
  <Text
    as="footer"
    bg="black"
    color="white"
    p={2}
    pb={4}
    fontSize={['normal', 'large', 'small']}
    fontWeight="heavy"
  >
    <Box height={2} bg="white" display={['none', null, 'block']} />
    <Grid
      gridTemplateColumns={['1fr', null, 'repeat(4, 1fr)']}
      gridRowGap={4}
      gridColumnGap={4}
    >
      <Section as="nav">
        <Subheading>Navigate</Subheading>
        <Box as="ul">
          <NavItem to="/shop/">Shop</NavItem>
          <NavItem to="/visit/">Visit</NavItem>
          <NavItem to="/about/">About</NavItem>
          <NavItem to="/news/">News</NavItem>
          <NavItem to="/account/">Account</NavItem>
        </Box>
      </Section>
      <Section singleColumn={true}>
        <Subheading>Email list</Subheading>
        <Text>Form here</Text>
      </Section>
      <Section singleColumn={true}>
        <Subheading>Contact</Subheading>
        <Text as="p">
          Standards Manual
          <br />
          212 Franklin Street
          <br />
          Brooklyn, NY 11222
        </Text>
        <Text as="p">347 903 1322</Text>
        <Text as="p">
          <Link to="mailto:contact@standardsmanual.com">
            contact@standardsmanual.com
          </Link>
          <br />
          <Link to="/">standardsmanual.com</Link>
        </Text>
      </Section>
      <Section>
        <Subheading>By</Subheading>
        <Text as="p">
          Jesse Reed
          <br />
          Hamish Smyth
        </Text>
      </Section>
      <Section
        gridColumn="1 / -1"
        gridTemplateColumns={['repeat(2, 1fr)', null, 'repeat(4, 1fr)']}
        gridColumnGap={4}
        forceBorderTopAlways={true}
      >
        <Text
          as="nav"
          fontSize={['small', 'normal', 'tiny']}
          fontFamily="mono"
          fontWeight="normal"
          gridColumn={[null, null, 'span 3']}
        >
          <Grid
            as="ul"
            gridTemplateColumns={[null, null, 'repeat(3, 1fr)']}
            gridColumnGap={4}
          >
            <NavItem to="/shipping/">Shipping</NavItem>
            <NavItem to="/returns/">Returns</NavItem>
            <NavItem to="/faq/">FAQ</NavItem>
          </Grid>
        </Text>
        <Link
          to="/about/"
          fontFamily="mono"
          fontSize={['small', 'normal', 'tiny']}
          fontWeight="normal"
        >
          &copy; {new Date().getFullYear()} Standards Manual, LLC
        </Link>
      </Section>
    </Grid>
  </Text>
)
