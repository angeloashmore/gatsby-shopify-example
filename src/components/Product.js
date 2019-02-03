import React from 'react'

import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  GatsbyImageContainer,
  GatsbyImage,
  AspectRatio,
  SVG,
} from 'system'
import { Button } from 'src/components/Button'
import { HTMLContent } from 'src/components/HTMLContent'
import { Subheading } from 'src/components/Subheading'
import { ReactComponent as AssetIconPlusSVG } from 'src/assets/icon-plus.svg'

export const Product = ({ handle, title, price, imageFluid, ...props }) => (
  <Box {...props}>
    {imageFluid && (
      <Link to={`/products/${handle}`}>
        <GatsbyImageContainer mb={2}>
          <AspectRatio x={1} y={1}>
            <GatsbyImage fluid={imageFluid} alt={title} />
          </AspectRatio>
        </GatsbyImageContainer>
      </Link>
    )}
    <Text
      as="div"
      borderColor="black"
      borderTop={2}
      fontSize={['medium', null, 'small']}
      fontWeight="semibold"
      pt={1}
      lineHeight="title"
    >
      <Flex alignItems="flex-start">
        <Subheading as="h4" fontWeight="inherit" mr={2} flex="1 1 auto">
          <Link
            to={`/products/${handle}/`}
            css={`
              &:hover {
                color: ${p => p.theme.colors.accent};
              }
            `}
          >
            {title}
          </Link>
        </Subheading>
        <Text mr={2}>{price}</Text>
        <Button slim={true}>
          <Flex alignItems="center">
            Add
            <SVG
              svg={AssetIconPlusSVG}
              x={1}
              y={1}
              fill="white"
              width="1rem"
              ml="0.25rem"
            />
          </Flex>
        </Button>
      </Flex>
    </Text>
  </Box>
)
