import React from 'react'

import parser from './parser'

function Markdown({ source }) {
  const res = parser.processSync(source)

  return <div className='markdown-container'>{res.result}</div>
}

export default Markdown
