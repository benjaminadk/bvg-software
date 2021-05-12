import Layout from '@/components/Layout'

import { AppProvider } from '@/lib/context'

import '../styles/styles.scss'

function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default App
