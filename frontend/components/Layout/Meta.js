// import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { createStructuredData } from '@/lib/utils'
import { CLIENT_URL, FACEBOOK_APP_ID } from '@/lib/constants'

function Meta() {
  const router = useRouter()

  let title = ''
  let description = ''

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <title>{title}</title>
      <meta name='description' content={description} />

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
        href='https://fonts.googleapis.com/css2?family=Raleway:wght@500;700&display=swap'
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
