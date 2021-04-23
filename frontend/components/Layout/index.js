import React from 'react'
import styled from 'styled-components'

import { GlobalStyles } from '../styles'
import Meta from './Meta'
import Header from './Header'
import Main from './Main'

function Layout({ children, pageProps }) {
  return (
    <Container>
      <Meta pageProps={pageProps} />
      <GlobalStyles />
      <Header />
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.main``

export default Layout
