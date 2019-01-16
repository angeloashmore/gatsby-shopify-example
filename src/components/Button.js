import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = ({ disabled, ...props }) => (
  <ButtonBase
    disabled={disabled}
    bg="black"
    color="cream"
    cursor={disabled ? 'not-allowed' : 'default'}
    fontSize="normal"
    fontWeight="medium"
    opacity={disabled ? 0.5 : 1}
    px={2}
    py={1}
    {...props}
  />
)
