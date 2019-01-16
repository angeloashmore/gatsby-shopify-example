import React from 'react'

import { Subheading as SubheadingBase } from 'system'

export const Subheading = props => (
  <SubheadingBase fontSize={['large', 'xlarge']} fontWeight="bold" {...props} />
)
