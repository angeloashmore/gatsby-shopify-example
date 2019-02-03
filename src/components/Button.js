import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = ({ disabled, ...props }) => (
  <ButtonBase
    disabled={disabled}
    bg={disabled ? 'black' : 'accent'}
    color="white"
    fontSize="normal"
    fontWeight="heavy"
    px={2}
    py={1}
    {...props}
  />
)
