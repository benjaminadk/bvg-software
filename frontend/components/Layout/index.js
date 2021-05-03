import React from 'react'
import styled from 'styled-components'

import { GlobalStyles } from '../styles'
import Meta from './Meta'
import Navbar from './Navbar'
import Search from './Search'
import Main from './Main'
import Footer from './Footer'

function Layout({ children, pageProps }) {
  return (
    <Container>
      <Meta pageProps={pageProps} />
      <GlobalStyles />
      <Navbar />
      <Search />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

const Container = styled.main``

export default Layout
