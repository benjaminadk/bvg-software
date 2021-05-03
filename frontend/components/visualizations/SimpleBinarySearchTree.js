import React, { useRef, useEffect } from 'react'
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
    <div className='mt-5'>
      <div className='d-flex my-3'>
        <div ref={searchFor1} />
        <div ref={reset1} />
      </div>
      <div className='fs-5' ref={linear1} />
      <div className='fs-5' ref={binary1} />
      <div ref={tree1} className='my-5' />
      <div className='d-flex my-3'>
        <div ref={searchFor2} />
        <div ref={reset2} />
      </div>
      <div className='fs-5' ref={linear2} />
      <div className='fs-5' ref={binary2} />
      <div ref={tree2} className='my-5' />
    </div>
  )
}

export default SimpleBinarySearchTree
