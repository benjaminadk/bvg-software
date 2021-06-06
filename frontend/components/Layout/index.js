import { Fragment, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

import Meta from './Meta'
import Navigation from './Navigation'
import StickyBar from './StickyBar'
import Main from './Main'

import { useAppDispatch } from '@/lib/context'
import { initializeUser, setProgress } from '@/lib/context/actions'
import { getPageHeight, gtagPageview } from '@/lib/utils'
import { CLIENT_URL } from '@/lib/constants'

const DynamicProgress = dynamic(() => import('@/components/Layout/Progress'))
const DynamicFooter = dynamic(() => import('@/components/Layout/Footer'))
const DynamicBackToTop = dynamic(() => import('@/components/Layout/BackToTop'))
const DynamicContactModal = dynamic(() => import('@/components/ContactModal'))

function Layout({ children, pageProps }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const main = useRef()

  useEffect(() => {
    initializeUser(dispatch)
  }, [])

  useEffect(() => {
    const onScroll = throttle(() => {
      if (
        ['/', '/blog', '/about', '/frequently-asked-questions', '/privacy'].includes(
          router.pathname
        )
      ) {
        setProgress(dispatch, 0)
      } else {
        const { scrollY, innerHeight } = window
        const pageHeight = getPageHeight()
        let progress = !scrollY
          ? 0
          : scrollY + innerHeight >= pageHeight
          ? 100
          : Math.round(((scrollY + innerHeight * (scrollY / pageHeight)) / pageHeight) * 100)

        setProgress(dispatch, progress)
      }
    }, 100)

    window.addEventListener('scroll', onScroll)

    // Google Analytics page view
    gtagPageview(`${CLIENT_URL}${router.pathname}`)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [router.pathname])

  return (
    <Fragment>
      <Meta pageProps={pageProps} />
      <Navigation />
      <StickyBar />
      <DynamicProgress />
      <Main ref={main}>{children}</Main>
      <DynamicFooter recentPosts={pageProps?.recentPosts} />
      <DynamicBackToTop />
      <DynamicContactModal />
    </Fragment>
  )
}

export default Layout
