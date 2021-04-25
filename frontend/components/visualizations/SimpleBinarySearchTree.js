import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Runtime, Inspector } from '@observablehq/runtime'
import notebook from './simple-binary-search-tree/file1'

function SimpleBinarySearchTree() {
  const reset1 = useRef()
  const searchFor1 = useRef()
  const linear1 = useRef()
  const binary1 = useRef()
  const tree1 = useRef()
  const reset2 = useRef()
  const searchFor2 = useRef()
  const linear2 = useRef()
  const binary2 = useRef()
  const tree2 = useRef()

  useEffect(() => {
    const runtime = new Runtime()

    runtime.module(notebook, (name) => {
      if (name === 'viewof reset1') {
        return new Inspector(reset1.current)
      }
      if (name === 'viewof searchFor1') {
        return new Inspector(searchFor1.current)
      }
      if (name === 'linear1') {
        return new Inspector(linear1.current)
      }
      if (name === 'binary1') {
        return new Inspector(binary1.current)
      }
      if (name === 'tree1') {
        return new Inspector(tree1.current)
      }
      if (name === 'viewof reset2') {
        return new Inspector(reset2.current)
      }
      if (name === 'viewof searchFor2') {
        return new Inspector(searchFor2.current)
      }
      if (name === 'linear2') {
        return new Inspector(linear2.current)
      }
      if (name === 'binary2') {
        return new Inspector(binary2.current)
      }
      if (name === 'tree2') {
        return new Inspector(tree2.current)
      }
    })
  }, [])

  return (
    <Container id='simple-binary-search-tree'>
      <div className='flex-row'>
        <div ref={searchFor1} />
        <div ref={reset1} />
      </div>
      <div ref={linear1} />
      <div ref={binary1} />
      <div ref={tree1} className='visualization' />
      <div className='flex-row'>
        <div ref={searchFor2} />
        <div ref={reset2} />
      </div>
      <div ref={linear2} />
      <div ref={binary2} />
      <div ref={tree2} className='visualization' />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 5rem;

  .flex-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2rem;
  }

  .visualization {
    margin: 3rem 0 6rem -6rem;
  }

  input[type='number'] {
    font-size: 2rem !important;
    font-weight: ${(p) => p.theme.font.bold};
    text-align: center;
    border: 0;
    border-radius: 3px;
    padding: 0.5rem;
  }

  input[type='button'],
  input[type='submit'] {
    font-size: 1.6rem;
    font-weight: ${(p) => p.theme.font.bold};
    background-color: ${(p) => p.theme.color.primary};
    color: ${(p) => p.theme.color.white};
    padding: 1.25rem 2rem;
    border: 0;
    border-radius: 3px;
    transition: background-color 0.2s ease-in;
    cursor: pointer;

    &:hover {
      background-color: ${(p) => lighten(0.1, p.theme.color.primary)};
    }
  }
`

export default SimpleBinarySearchTree
