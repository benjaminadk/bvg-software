import React from 'react'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <h1>Homepage</h1>
    </Container>
  )
}

const Container = styled.div`
  h1 {
    color: green;
  }
`

export default Home
