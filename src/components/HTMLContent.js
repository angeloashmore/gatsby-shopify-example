import React from 'react'

import { Box, Text } from 'src/components/system'
import { HTML } from 'src/components/HTML'

export const HTMLContent = ({ children, html, map = {}, ...props }) => (
  <Box {...props}>
    {children || (
      <HTML
        html={html}
        map={{
          h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
          h2: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
          h3: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
          h4: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
          h5: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
          h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
          p: props => <Text {...props} />,
          ...map,
        }}
      />
    )}
  </Box>
)
