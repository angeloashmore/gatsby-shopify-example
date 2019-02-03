import React from 'react'

import { Button, Text } from 'system'

const refreshData = () => fetch('/__refresh', { method: 'post' })

export const DevRefreshButton = props => (
  <Button
    onClick={refreshData}
    bg="black"
    color="white"
    cursor="pointer"
    opacity={0.1}
    outline={0}
    position="fixed"
    px={2}
    py={1}
    right={0}
    top={0}
    zIndex={9999}
    css={{ '&:hover': { opacity: 1 } }}
    {...props}
  >
    <Text fontSize="0.6rem" fontWeight="bold" textStyle="smallCaps">
      Refresh Data
    </Text>
  </Button>
)
