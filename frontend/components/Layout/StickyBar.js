import { Fragment, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { ChevronRight } from 'react-bootstrap-icons'

import { BREADCRUMB_MAP } from '@/lib/constants'

const DynamicSearch = dynamic(() => import('@/components/Layout/Search'))

function StickyBar() {
  const router = useRouter()

  const breadcrumbs = useMemo(() => {
    return [
      '/',
      ...router.asPath
        .slice(0, router.asPath.indexOf('#'))
        .split('/')
        .filter((el) => !!el),
    ]
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
        <DynamicSearch />
      </Container>
    </Navbar>
  )
}

export default StickyBar
