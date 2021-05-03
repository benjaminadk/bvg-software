import React, { useState, useRef } from 'react'
import { Check } from '@styled-icons/material'
import copy from 'clipboard-copy'

function Pre({ children, className }) {
  const pre = useRef()

  const [copied, setCopied] = useState(false)

  function onClick() {
    copy(
      pre.current.textContent
        .slice(0, pre.current.textContent.length - 4)
        .trim()
    )
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <div className='pre-container'>
      <pre ref={pre} className={className}>
        {children}
        <button
          type='button'
          className='copy-btn btn btn-secondary text-uppercase shadow-none'
          onClick={onClick}
        >
          {copied ? <Check size={20} /> : 'Copy'}
        </button>
      </pre>
    </div>
  )
}

export default Pre
