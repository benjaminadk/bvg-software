import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

import Meta from './Meta'
import Navbar from './Navbar'
import Search from './Search'
import Progress from './Progress'
import Footer from './Footer'

import { useAppDispatch } from '@/lib/context'
import { initializeUser, setProgress } from '@/lib/context/actions'

function Layout({ children, pageProps }) {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const main = useRef()

  useEffect(() => {
    initializeUser(dispatch)
  }, [])

  useEffect(() => {
    console.log(router.pathname)
    const onScroll = throttle(() => {
      const progress = !window.scrollY
        ? 0
        : Math.round(((window.scrollY + 150) / main.current.offsetHeight) * 100)
      console.log(progress)
      setProgress(dispatch, progress)
    }, 100)

    if (router.pathname == '/blog/[slug]') {
      window.addEventListener('scroll', onScroll)
    } else {
      window.removeEventListener('scroll', onScroll)
    }

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
      <main ref={main} className='min-vh-100 mt-5'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
