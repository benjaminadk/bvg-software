import styled from 'styled-components'
import { ArrowNarrowRight } from '@styled-icons/heroicons-outline'
import { lighten } from 'polished'

function Li({ children, ...rest }) {
  return (
    <Container {...rest}>
      <ArrowNarrowRight size={20} />
      {children}
    </Container>
  )
}

const Container = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  text-align: justify;
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  svg {
    margin-right: 0.5rem;
  }

  & > code {
    font-size: 1.3rem;
    background-color: ${(p) => lighten(0.4, p.theme.color.primary)};
    color: ${(p) => p.theme.color.primary};
    padding: 0.2rem 0.4rem;
    margin: 0 0.4rem;
    border-radius: 0.4rem;
  }

  & > a {
    color: ${(p) => p.theme.color.primary};
    margin: 0 0.4rem;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default Li
