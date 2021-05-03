import React, { StrictMode, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import SimpleReactLightbox from 'simple-react-lightbox'
import NProgress from 'nprogress'

import Layout from '@/components/Layout'

import { theme } from '@/components/styles'
import '../styles/styles.scss'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    function handleRouteChangeStart() {
      NProgress.start()
    }

    function handleRouteChangeComplete() {
      NProgress.done()
    }

    function handleRouteChangeError() {
      NProgress.start()
    }

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
    <StrictMode>
      <ThemeProvider theme={theme}>
        <SimpleReactLightbox>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </SimpleReactLightbox>
      </ThemeProvider>
    </StrictMode>
  )
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
}

export default App
