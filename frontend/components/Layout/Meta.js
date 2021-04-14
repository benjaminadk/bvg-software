import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import * as UTILS from '../lib/utils'
import * as CONSTANTS from '../lib/constants'

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
      <meta
        property='og:url'
        content={`${CONSTANTS.CLIENT_URL}${router.asPath}`}
      />
      <meta property='fb:app_id' content={CONSTANTS.FACEBOOK_APP_ID} />

      {/* Website Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: UTILS.createStructuredData('website', null),
        }}
      />

      {/* Organization Structured Data */}
      {false && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: UTILS.createStructuredData('organization', null),
          }}
        />
      )}

      {/* Preload Local Fonts */}
      <link
        rel='preload'
        href='/fonts/FuturaPT-Bold.woff'
        as='font'
        crossOrigin=''
      />
      <link
        rel='preload'
        href='/fonts/FuturaPT-Demi.woff'
        as='font'
        crossOrigin=''
      />
      <link
        rel='preload'
        href='/fonts/FuturaPT-Book.woff'
        as='font'
        crossOrigin=''
      />

      {/* Klaviyo */}
      <script
        async
        type='text/javascript'
        src='//static.klaviyo.com/onsite/js/klaviyo.js?company_id=TDhdAz'
      ></script>
    </Head>
  )
}

export default Meta
