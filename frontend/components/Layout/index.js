import { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

import Meta from './Meta'
import Navigation from './Navigation'
import StickyBar from './StickyBar'
import Progress from './Progress'
import Main from './Main'
import Footer from './Footer'
import BackToTop from './BackToTop'
import ContactModal from '../ContactModal'

import { useAppDispatch } from '@/lib/context'
import { initializeUser, setProgress } from '@/lib/context/actions'
import { getPageHeight, gtagPageview } from '@/lib/utils'
import { CLIENT_URL } from '@/lib/constants'

function Layout({ children, pageProps }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const main = useRef()

  useEffect(() => {
    initializeUser(dispatch)
  }, [])

  useEffect(() => {
    const onScroll = throttle(() => {
      if (['/', '/blog', '/about'].includes(router.pathname)) {
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

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [router.pathname])

  useEffect(() => {
    function handleRouteChangeStart() {}

    function handleRouteChangeComplete() {}

    function handleRouteChangeError() {}

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    gtagPageview(`${CLIENT_URL}${router.pathname}`)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.pathname])

  return (
    <Fragment>
      <Meta pageProps={pageProps} />
      <Navigation />
      <StickyBar />
      <Progress />
      <Main ref={main}>{children}</Main>
      <Footer recentPosts={pageProps?.recentPosts} />
      <BackToTop />
      <ContactModal />
    </Fragment>
  )
}

export default Layout
