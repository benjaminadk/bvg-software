import React from 'react'

import parser from './parser'

function Markdown({ source, className }) {
  const res = parser.processSync(source)

  return <div className={className}>{res.result}</div>
}

export default Markdown
