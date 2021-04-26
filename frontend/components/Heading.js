import React from 'react'
import styled from 'styled-components'

function Heading({ children }) {
  return (
    <Container>
      <div className='heading-overlay' />
      <div className='heading-content'>{children}</div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding: 4rem 0;

  .heading-overlay {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${(p) => p.theme.color.gray100};
    /* background-image: url('../../code.jpg'); */
    opacity: 1;
  }

  .heading-content {
    z-index: 1;
    position: relative;
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
`

export default Heading
