import React from 'react'
import PropTypes from 'prop-types'
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

Layout.propTypes = {
  children: PropTypes.object,
  pageProps: PropTypes.object,
}

export default Layout
