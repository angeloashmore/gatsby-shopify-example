import React from 'react'

import { Heading as HeadingBase } from 'system'

export const Heading = props => (
  <HeadingBase fontSize={['xlarge', 'xxlarge']} fontWeight="bold" {...props} />
)
