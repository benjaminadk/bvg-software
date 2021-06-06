import React from 'react'
import unified from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import refractor from 'refractor/core'
import raw from 'rehype-raw'
import visit from 'unist-util-visit'
import nodeToString from 'hast-util-to-string'
import bash from 'refractor/lang/bash'
import graphql from 'refractor/lang/graphql'
import jsx from 'refractor/lang/jsx'
import javascript from 'refractor/lang/javascript'
import sass from 'refractor/lang/sass'
import css from 'refractor/lang/css'
import cssExtras from 'refractor/lang/css-extras'
import jsExtras from 'refractor/lang/js-extras'
import markdown from 'refractor/lang/markdown'
import json from 'refractor/lang/json'
import php from 'refractor/lang/php'
import yaml from 'refractor/lang/yaml'

import { Blockquote, Img, Li, Pre, Ol, Span } from './elements'

refractor.register(bash)
refractor.register(graphql)
refractor.register(jsx)
refractor.register(json)
refractor.register(php)
refractor.register(yaml)
refractor.register(javascript)
refractor.register(jsExtras)
refractor.register(sass)
refractor.register(css)
refractor.register(cssExtras)
refractor.register(markdown)

refractor.alias({ jsx: ['js'] })

function getLanguage(node) {
  const className = node.properties.className || []

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase()
    }
  }

  return null
}

function rehypePrism(options) {
  options = options || {}

  return (tree) => {
    visit(tree, 'element', visitor)
  }

  function visitor(node, index, parent) {
    if (node.tagName === 'a') {
      node.properties.target = '_blank'
    }

    if (node.tagName === 'table') {
      node.properties.className = 'table'
    }

    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return
    }

    const lang = getLanguage(node)

    if (lang === null) {
      return
    }

    let result
    try {
      parent.properties.className = (parent.properties.className || []).concat('language-' + lang)
      result = refractor.highlight(nodeToString(node), lang)
    } catch (err) {
      if (options.ignoreMissing && /Unknown language/.test(err.message)) {
        return
      }
      throw err
    }

    node.children = result
  }
}

const parser = unified()
  .use(parse)
  .use(gfm)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(raw)
  .use(rehypePrism)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      blockquote: Blockquote,
      img: Img,
      li: Li,
      pre: Pre,
      ol: Ol,
      span: Span,
    },
  })

export default parser
