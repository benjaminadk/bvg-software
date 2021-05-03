import React, { useRef, useEffect } from 'react'
import { Runtime, Inspector } from '@observablehq/runtime'

import notebook from './minesweeper/file1'

function Minesweeper() {
  const level = useRef()
  const minesweeper = useRef()
  const pattern = useRef()
  const style = useRef()

  useEffect(() => {
    const runtime = new Runtime()

    runtime.module(notebook, (name) => {
      if (name === 'viewof level') {
        return new Inspector(level.current)
      }
      if (name === 'minesweeper') {
        return new Inspector(minesweeper.current)
      }
      if (name === 'style') {
        return new Inspector(style.current)
      }
      if (name === 'pattern') {
        return new Inspector(pattern.current)
      }
    })
  }, [])

  return (
    <div className='mt-5'>
      <div ref={level} />
      <div className='d-flex justify-content-center'>
        <div ref={minesweeper} />
      </div>
      <div ref={pattern} />
      <div ref={style} />
    </div>
  )
}

export default Minesweeper
