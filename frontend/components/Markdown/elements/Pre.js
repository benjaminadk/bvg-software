import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import { Clipboard, ClipboardCheck } from 'react-bootstrap-icons'
import copy from 'clipboard-copy'

function Pre({ children, className }) {
  const pre = useRef()

  const [copied, setCopied] = useState(false)

  function onClick() {
    copy(pre.current.textContent.slice(0, pre.current.textContent.length).trim())
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <div className='pre-container'>
      <pre ref={pre} className={className}>
        {children}
        <Button className='copy-btn' variant='secondary' onClick={onClick}>
          {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
        </Button>
      </pre>
    </div>
  )
}

export default Pre
