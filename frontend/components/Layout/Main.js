import PropTypes from 'prop-types'
import styled from 'styled-components'

function Main({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.main``

Main.propTypes = {
  children: PropTypes.object,
}

export default Main
