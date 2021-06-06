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

export function reportWebVitals({ id, name, label, value }) {
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  })
}

export default App
