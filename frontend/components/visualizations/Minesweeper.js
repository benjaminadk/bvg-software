import React, { useRef, useEffect } from 'react'
import { Runtime, Inspector } from '@observablehq/runtime'
import styled from 'styled-components'

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
    <Container>
      <div ref={level} className='level' />
      <div className='flex-row'>
        <div ref={minesweeper} />
      </div>
      <div ref={pattern} />
      <div ref={style} />
    </Container>
  )
}

const Container = styled.div`
  .level {
    margin: 4rem auto 2rem;

    form > div > div,
    select {
      font-size: 1.6rem !important;
    }
  }

  .flex-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Minesweeper
