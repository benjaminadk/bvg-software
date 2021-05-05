import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Meta from './Meta'
import Navbar from './Navbar'
import Search from './Search'
import Progress from './Progress'
import Main from './Main'
import Footer from './Footer'

import { useAppDispatch } from '@/lib/context'
import { initializeUser } from '@/lib/context/actions'

function Layout({ children, pageProps }) {
  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    initializeUser(dispatch)
  }, [])

  useEffect(() => {
    function handleRouteChangeStart() {}

    function handleRouteChangeComplete() {}

    function handleRouteChangeError() {}

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events])
  return (
    <>
      <Meta pageProps={pageProps} />
      <Navbar />
      <Search />
      <Progress />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
