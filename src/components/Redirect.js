import React from 'react'
import { Redirect as ReachRouterRedirect } from '@reach/router'

export const Redirect = props => (
  <ReachRouterRedirect noThrow={true} {...props} />
)
