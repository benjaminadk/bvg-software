import { Fragment, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { ChevronRight } from 'react-bootstrap-icons'

import { BREADCRUMB_MAP } from '@/lib/constants'

function StickyBar() {
  const searchRef = useRef()

  const router = useRouter()

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    function handleKeyDown({ ctrlKey, keyCode }) {
      if (ctrlKey && keyCode === 191) {
        searchRef.current.focus()
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const breadcrumbs = useMemo(() => {
    return ['/', ...router.asPath.split('/').filter((el) => !!el)]
  }, [router.asPath])

  return (
    <Navbar className='StickyBar' bg='gray-300' variant='light' sticky='top'>
      <Container fluid='xxl' className='sticky-bar-container'>
        <div className='breadcrumbs-container'>
          {breadcrumbs.map((breadcrumb, i) => {
            if (i === breadcrumbs.length - 1) {
              return <span key={breadcrumb}>{BREADCRUMB_MAP[breadcrumb]}</span>
            } else {
              return (
                <Fragment key={breadcrumb}>
                  <Link href={breadcrumb === '/' ? '/' : `/${breadcrumb}`}>
                    <a>{BREADCRUMB_MAP[breadcrumb]}</a>
                  </Link>
                  <ChevronRight />
                </Fragment>
              )
            }
          })}
        </div>
        <Form>
          <FormControl ref={searchRef} type='search' placeholder='Search' className='mr-sm-2' />
        </Form>
      </Container>
    </Navbar>
  )
}

export default StickyBar
