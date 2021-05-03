import styled from 'styled-components'
import { ArrowRight } from '@styled-icons/bootstrap'
import { lighten, darken } from 'polished'

function Li({ children, number, ...rest }) {
  return (
    <li className='list-unstyled d-flex align-items-center m-2' {...rest}>
      {number ? (
        <span className='li-content'>{number}</span>
      ) : (
        <span className='li-content'>
          <ArrowRight size={20} />
        </span>
      )}
      {children}
    </li>
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

  .item {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center center;
    border-radius: 50%;
    background-color: ${(p) => lighten(0.45, p.theme.color.warning)};
    color: ${(p) => darken(0.15, p.theme.color.warning)};
    border: 1px solid ${(p) => lighten(0.35, p.theme.color.warning)};
    margin-right: 0.75rem;
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
