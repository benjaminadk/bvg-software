import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Runtime, Inspector } from '@observablehq/runtime'
import notebook from './high-school-clock/file1'

function HighSchoolClock() {
  const slider = useRef()
  const clock = useRef()

  const [size, setSize] = useState(400)

  useEffect(() => {
    const runtime = new Runtime()
    runtime.module(notebook, (name) => {
      console.log(name)
      if (name === 'clock') {
        return new Inspector(clock.current)
      }
      if (name === 'mutable size') {
        return {
          fulfilled: (value) => {
            slider.current = value
          },
        }
      }
    })
  }, [])

  useEffect(() => {
    if (slider.current) {
      slider.current.value = size
    }
  }, [size])

  return (
    <Container>
      <div>
        <div className='input-label'>Clock Size</div>
        <input
          type='range'
          value={size}
          min={40}
          max={800}
          step={5}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div className='clock-wrapper'>
        <div ref={clock} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  margin: 5rem auto;

  .input-label {
    font-size: 1.6rem;
    font-weight: ${(p) => p.theme.font.bolder};
    margin-bottom: 0.5rem;
  }

  .clock-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
`

export default HighSchoolClock
