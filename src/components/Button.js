import React from 'react'

import { Button as ButtonBase } from 'system'

export const Button = ({ disabled, slim = false, ...props }) => (
  <ButtonBase
    disabled={disabled}
    bg={disabled ? 'black' : 'accent'}
    borderRadius="0.25rem"
    color="white"
    cursor="pointer"
    fontSize="normal"
    fontWeight="bold"
    letterSpacing={-0.5}
    px={2}
    py={slim ? 1 : 2}
    textAlign="center"
    textStyle="lowercase"
    css={`
      &:hover {
        background-color: ${p => p.theme.colors.black};
      }
    `}
    {...props}
  />
)
