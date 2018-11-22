import React from 'react'

import { Box, Heading } from 'src/components/system'
import { HTMLContent } from 'src/components/HTMLContent'
import { Link } from 'src/components/Link'

export const Product = ({ to, title, descriptionHtml, price, ...props }) => (
  <Box {...props}>
    <Heading as="h4" fontSize="large">
      <Link to={to}>{title}</Link>
    </Heading>
    <HTMLContent html={descriptionHtml} />
  </Box>
)
