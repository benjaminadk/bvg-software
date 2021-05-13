import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import cn from 'classnames'
import { ArrowUpSquareFill } from 'react-bootstrap-icons'

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = throttle(() => {
      setShow(window.scrollY > window.innerHeight - 350)
    }, 500)

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function scrollToTop(e) {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      id='BackToTop'
      className={cn({ 'show-btt': show, 'hide-btt': !show })}
      onClick={scrollToTop}
    >
      <ArrowUpSquareFill size={40} />
    </div>
  )
}

export default BackToTop
