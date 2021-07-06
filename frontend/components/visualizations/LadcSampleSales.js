import React, { useRef, useEffect } from 'react'
import { Runtime, Inspector } from '@observablehq/runtime'
import notebook from './ladc-sample-sales/file1'

function LadcSampleSales() {
  const bubbleChart = useRef()
  const groupBy = useRef()
  const selectedManufacturers = useRef()

  useEffect(() => {
    const runtime = new Runtime()

    runtime.module(notebook, (name) => {
      console.log(name)
      if (name === 'bubbleChart') {
        return new Inspector(bubbleChart.current)
      }
      if (name === 'viewof groupBy') {
        return new Inspector(groupBy.current)
      }
      if (name === 'viewof selectedManufacturers') {
        return new Inspector(selectedManufacturers.current)
      }
    })
  }, [])

  return (
    <div className='mt-5'>
      <div className='bubble-chart' ref={bubbleChart} />
      <div ref={groupBy} />
      <div className='mt-3' ref={selectedManufacturers} />
    </div>
  )
}

export default LadcSampleSales
