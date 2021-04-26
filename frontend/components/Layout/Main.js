import styled from 'styled-components'

function Main({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.main`
  min-height: ${(p) => `calc(100vh - ${p.theme.headerHeight})`};
  margin-top: ${(p) => p.theme.headerHeight};
`

export default Main
