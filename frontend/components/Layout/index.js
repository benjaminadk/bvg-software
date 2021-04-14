import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GlobalStyles } from '../styles'
import Meta from './Meta'
import Main from './Main'

function Layout({ children }) {
  return (
    <Container>
      <Meta />
      <GlobalStyles />
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.main``

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
