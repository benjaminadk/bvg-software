import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

function About() {
  return (
    <Container>
      <div className='avatar-wrapper'>
        <Image
          src={`/about/benjamin-brooke.svg`}
          alt='Benjamin Brooke'
          width={400}
          height={400}
        />
      </div>
      <h1>Benjamin Brooke</h1>
      <h2>Full Stack Developer</h2>
    </Container>
  )
}

const Container = styled.div`
  .avatar-wrapper {
    display: grid;
    place-items: center center;
  }

  h1 {
    font-size: 4rem;
    font-weight: ${(p) => p.theme.font.bold};
    text-align: center;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.dark};
    margin: 0.5rem 0 0;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: ${(p) => p.theme.font.normal};
    text-align: center;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.dark};
    margin: 0;
  }
`

export default About
