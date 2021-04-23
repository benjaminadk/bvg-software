import styled from 'styled-components'

function Span({ children, ...rest }) {
  if (children[0] === '// highlight-line') {
    return <Container {...rest} className='highlight' />
  } else {
    return <Container {...rest}>{children}</Container>
  }
}

const Container = styled.span.attrs((p) => ({
  className: p.className,
}))`
  line-height: 1.6;
`

export default Span
