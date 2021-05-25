import { ArrowRight } from 'react-bootstrap-icons'

function Li({ children, number, ...rest }) {
  return (
    <li className='list-unstyled m-2' {...rest}>
      {number ? (
        <span className='li-icon'>{number}</span>
      ) : (
        <span className='li-icon'>
          <ArrowRight size={20} />
        </span>
      )}
      <span className='li-content'>{children}</span>
    </li>
  )
}

export default Li
