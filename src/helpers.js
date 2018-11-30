import { get, map, compose, isString } from 'lodash/fp'

// Constant is true if in the browser, false otherwise.
// Helpful to determine if rendering on the server (i.e.
// without window).
export const isBrowser = typeof window !== 'undefined'

// Returns true if the URL is internal, false otherwise.
export const isInternal = s => isString(s) && /^\/(?!\/)/.test(s)

// Returns an array of nodes from the connection data provided as a result of a
// GraphQL query.
export const nodes = compose(
  map('node'),
  get('edges')
)
