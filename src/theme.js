import { range, zipObject } from 'lodash/fp'

const ms = (v = 0, r = Math.sqrt(2)) => Math.round(10 * Math.pow(r, v)) / 10

export const theme = {
  colors: {
    black: '#252525',
    gray: '#616161',
    grayExtraLight: '#f6f6f6',
    grayLight: '#ebebeb',
    orange: '#ef3c24',
    white: '#fff',
  },
  lineHeights: {
    solid: 1,
    title: 1.15,
    copy: 1.5,
  },
  fonts: {
    sans: '"Inter UI", sans-serif',
  },
  fontSizes: zipObject(range(-5, 10), range(-5, 10).map(x => ms(x / 2))),
}
