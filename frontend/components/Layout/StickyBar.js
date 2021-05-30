import { Fragment, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { ChevronRight } from 'react-bootstrap-icons'

import { BREADCRUMB_MAP } from '@/lib/constants'

import Search from './Search'

function StickyBar() {
  const router = useRouter()

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
        <Search />
      </Container>
    </Navbar>
  )
}

export default StickyBar
