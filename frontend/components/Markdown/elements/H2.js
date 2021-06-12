import { useMemo } from 'react'
import { Link45deg } from 'react-bootstrap-icons'

function H2({ children }) {
  const id = useMemo(() => children[0].toLowerCase().replace('?', '').replace(/\s/g, '-'), [])
  return (
    <h2>
      <span className='anchor' id={id}></span>
      <a href={`#${id}`}>{children}</a>
      <span className='icon'>
        <Link45deg size={30} />
      </span>
    </h2>
  )
}

export default H2
