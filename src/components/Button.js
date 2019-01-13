import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = ({ disabled, ...props }) => (
  <ButtonBase
    disabled={disabled}
    bg="black"
    color="cream"
    fontSize="normal"
    fontWeight="medium"
    px={2}
    py={1}
    opacity={disabled ? 0.5 : 1}
    {...props}
  />
)
