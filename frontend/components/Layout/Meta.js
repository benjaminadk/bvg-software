import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { createStructuredData } from '@/lib/utils'
import { CLIENT_URL, FACEBOOK_APP_ID } from '@/lib/constants'

function Meta({ pageProps }) {
  const router = useRouter()

  const page = useMemo(() => {
    return (
      pageProps?.homePage || pageProps?.aboutPage || pageProps?.blogPost || null
    )
  }, [pageProps])

  const [title, description] = useMemo(() => {
    return page ? [page.meta_title, page.meta_description] : ['', '']
  }, [page])

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />

      <title>{title}</title>
      <meta name='description' content={description} />

      <link rel='icon' type='image/x-icon' href='/icons/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/icons/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/icons/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#2b5797' />
      <meta name='theme-color' content='#ffffff'></meta>

      {/* Facebook Open Graph Tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta key='type' property='og:type' content='website' />
      <meta property='og:url' content={`${CLIENT_URL}${router.asPath}`} />
      <meta property='fb:app_id' content={FACEBOOK_APP_ID} />

      {/* Website Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: createStructuredData('website', null),
        }}
      />

      {/* Organization Structured Data */}
      {false && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('organization', null),
          }}
        />
      )}

      {/* Google Font */}
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap'
        rel='stylesheet'
      />

      {/* Klaviyo */}
      <script
        async
        type='text/javascript'
        src='//static.klaviyo.com/onsite/js/klaviyo.js?company_id=TDhdAz'
      />
    </Head>
  )
}

export default Meta
