import PropTypes from 'prop-types'
import styled from 'styled-components'

function Main({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.main`
  margin-top: ${(p) => p.theme.headerHeight};
  padding-top: 5rem;
`

Main.propTypes = {
  children: PropTypes.object,
}

export default Main
