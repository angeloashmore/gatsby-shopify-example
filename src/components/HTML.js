import React from 'react'
import Parser from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'
import { getOr, has, always } from 'lodash/fp'

export const HTML = ({ html = '', map = {}, ...props }) => {
  const parserOptions = {
    replace: ({ name, attribs: attrs, children: nodeChildren }) => {
      let children = null
      if (nodeChildren) children = domToReact(nodeChildren, parserOptions)

      if (!has(name, map)) return

      const Comp = getOr(always(null), name, map)

      return (
        <Comp name={name} {...attrs}>
          {children}
        </Comp>
      )
    },
  }

  return Parser(html, parserOptions)
}
