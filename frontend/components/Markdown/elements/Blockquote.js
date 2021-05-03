import React from 'react'
import parser from '../parser'

function Blockquote({ children }) {
  const res = parser.processSync(children)

  return (
    <figure className='text-center my-5'>
      <blockquote className='blockquote'>
        <p className='d-inline text-yellow-700 bg-yellow-100 p-3 fs-6 rounded border border-warning'>
          {res[1]?.props?.children[0]}
        </p>
      </blockquote>
    </figure>
  )
}

export default Blockquote
