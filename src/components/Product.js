import React from 'react'

import { Box, Heading, Link } from 'system'
import { HTMLContent } from 'src/components/HTMLContent'

export const Product = ({
  handle,
  title,
  descriptionHtml,
  price,
  ...props
}) => (
  <Box {...props}>
    <Heading as="h4" fontSize="large">
      <Link to={`/products/${handle}/`}>{title}</Link>
    </Heading>
    <HTMLContent html={descriptionHtml} />
  </Box>
)
