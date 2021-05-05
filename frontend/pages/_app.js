import SimpleReactLightbox from 'simple-react-lightbox'

import Layout from '@/components/Layout'

import { AppProvider } from '@/lib/context'

import '../styles/styles.scss'

function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <SimpleReactLightbox>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SimpleReactLightbox>
    </AppProvider>
  )
}

export default App
