function Span({ children, ...rest }) {
  if (children[0] === '// highlight-line') {
    return <span {...rest} className='highlight' />
  } else {
    return <span {...rest}>{children}</span>
  }
}

export default Span
