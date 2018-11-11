import { get, map, compose } from 'lodash/fp'

export const nodes = compose(
  map('node'),
  get('edges')
)
