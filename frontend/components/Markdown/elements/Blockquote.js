import React from 'react'
import styled from 'styled-components'
import parser from '../parser'

function Blockquote({ children }) {
  const res = parser.processSync(children)
  return <Container>{res.result}</Container>
}

const Container = styled.blockquote``

export default Blockquote
