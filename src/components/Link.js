import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import { isInternal } from 'src/helpers'

export const Link = ({ to, getProps, children, ...props }) =>
  to && isInternal(to) ? (
    <GatsbyLink to={to} getProps={getProps} {...props}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={to} {...props}>
      {children}
    </a>
  )
