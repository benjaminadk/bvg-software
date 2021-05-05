import { ArrowRight } from 'react-bootstrap-icons'

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

export default Li
