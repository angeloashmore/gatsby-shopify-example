import styled from 'styled-components'
import {
  alignItems,
  alignSelf,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  borderColor,
  borderRadius,
  borders,
  bottom,
  boxShadow,
  color,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  height,
  justifyContent,
  left,
  letterSpacing,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  order,
  overflow,
  position,
  right,
  space,
  textAlign,
  textStyle,
  top,
  width,
  zIndex,
  style,
  variant,
} from 'styled-system'

const clear = style({ prop: 'clear' })
const cursor = style({ prop: 'cursor' })
const fill = style({ prop: 'fill', key: 'colors' })
const float = style({ prop: 'float' })
const outline = style({ prop: 'outline' })
const whiteSpace = style({ prop: 'whiteSpace' })
const boxStyle = variant({
  prop: 'boxStyle',
  key: 'boxStyles',
})

export const Box = styled.div(
  space,
  alignSelf,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  borders,
  borderColor,
  borderRadius,
  bottom,
  boxShadow,
  clear,
  color,
  cursor,
  display,
  flex,
  flexBasis,
  float,
  fontSize,
  height,
  left,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  order,
  outline,
  overflow,
  position,
  right,
  top,
  width,
  whiteSpace,
  zIndex,
  boxStyle
)

Box.defaultProps = {
  display: 'block',
}

export const Flex = styled(Box)(
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
)

Flex.defaultProps = {
  ...Box.defaultProps,
  display: 'flex',
}

export const SVG = styled(Box)(p => ({
  '*': {
    ...fill(p),
  },
}))

SVG.defaultProps = {
  display: 'block',
}

export const Text = styled(Box)(
  fontFamily,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  textStyle
)

Text.defaultProps = {
  as: 'p',
}

export const Heading = styled(Text)({})

Heading.defaultProps = {
  ...Text.defaultProps,
  as: 'h2',
  fontSize: ['xlarge', 'xxlarge'],
  fontWeight: 'bold',
}

export const Subheading = styled(Text)({})

Subheading.defaultProps = {
  ...Text.defaultProps,
  as: 'h3',
}

export const Input = styled(Text)({
  appearance: 'none',
  '&:required': {
    boxShadow: 'none',
  },
})

Input.defaultProps = {
  ...Text.defaultProps,
  as: 'input',
  border: 'none',
  type: 'text',
}

export const Button = styled(Input)({})

Button.defaultProps = {
  ...Input.defaultProps,
  as: 'button',
  bg: 'transparent',
  border: 0,
  display: 'inline-block',
  lineHeight: 'solid',
  p: 0,
}
