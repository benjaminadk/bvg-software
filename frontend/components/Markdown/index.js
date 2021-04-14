import React from 'react'
import PropTypes from 'prop-types'

import parser from './parser'

function Markdown({ source, className }) {
  const res = parser.processSync(source)

  return <div className={className}>{res.result}</div>
}

Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

export default Markdown
