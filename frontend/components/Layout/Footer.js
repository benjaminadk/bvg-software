import React from 'react'
import styled from 'styled-components'

function Footer() {
  return <Container></Container>
}

const Container = styled.footer`
  height: ${(p) => p.theme.footerHeight};
  background-color: ${(p) => p.theme.color.secondary};
`

export default Footer
