import React from 'react'
import styled from 'styled-components'

import { GlobalStyles } from '../styles'
import Main from './Main'

function Layout({ children }) {
  return (
    <Container>
      <GlobalStyles />
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.div``

export default Layout
