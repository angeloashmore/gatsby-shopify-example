import { mapValues, range, map } from 'lodash/fp'

export const theme = {
  breakpoints: map(x => x + 'rem', [48, 60, 100]),
  colors: {
    black: '#000',
    white: '#fff',
    cream: '#f5f0ea',
  },
  lineHeights: {
    solid: 1,
    title: 1.15,
    copy: 1.5,
  },
  fonts: {
    sans: '"Inter UI", sans-serif',
  },
  fontSizes: {
    xtiny: '0.6rem',
    tiny: '0.7rem',
    small: '0.8rem',
    normal: '1rem',
    midLarge: '1.15rem',
    large: '1.4rem',
    xlarge: '1.75rem',
    xxlarge: '2.25rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
  maxWidths: {
    tiny: '8rem',
    small: '24rem',
    xlarge: '100rem',
  },
  mediaSizes: {
    m: '48rem',
    l: '100rem',
  },
  space: map(n => n / 2 + 'rem', range(0, 30)),
  transition: '200ms',
  textStyles: {
    caps: {
      textTransform: 'uppercase',
    },
    smallCaps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
}

theme.boxStyles = {
  lastNoMargin: {
    '&:last-child': {
      marginBottom: 0,
      marginRight: 0,
    },
  },
}

theme.mediaQueries = mapValues(
  x => `@media (min-width: ${x})`,
  theme.mediaSizes
)

// Shortcuts
theme.b = theme.breakpoints
theme.c = theme.colors
theme.f = theme.fonts
theme.fs = theme.fontSizes
theme.fw = theme.fontWeights
theme.lh = theme.lineHeights
theme.mq = theme.mediaQueries
theme.mw = theme.maxWidths
theme.s = theme.space
theme.t = theme.transition
theme.ts = theme.textStyles

export default theme
