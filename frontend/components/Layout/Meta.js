import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { createStructuredData } from '@/lib/utils'
import { CLIENT_URL, CLOUDINARY_URL, FACEBOOK_APP_ID } from '@/lib/constants'

function Meta({ pageProps }) {
  const router = useRouter()

  const page = useMemo(() => {
    return (
      pageProps?.homePage ||
      pageProps?.blogPage ||
      pageProps?.aboutPage ||
      pageProps?.coursesPage ||
      pageProps?.faqPage ||
      pageProps?.privacyPage ||
      pageProps?.blogPost ||
      null
    )
  }, [pageProps])

  const [title, description, image] = useMemo(() => {
    return [page?.meta_title || '', page?.meta_description || '', page?.image || '']
  }, [page])

  const post = useMemo(() => {
    return pageProps?.blogPost || null
  }, [pageProps])

  const video = useMemo(() => {
    return post?.video || pageProps?.aboutPage?.video || null
  }, [post])

  const faqs = useMemo(() => {
    return pageProps?.faqPage?.faqs
  }, [pageProps])

  const how_to = useMemo(() => {
    return page?.how_to || null
  }, [page])

  const route = useMemo(() => {
    return router?.asPath || null
  }, [])

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Icons */}
      <link rel='icon' type='image/x-icon' href='/icons/favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#2b5797' />
      <meta name='theme-color' content='#ffffff'></meta>

      {/* Facebook Open Graph Tags */}
      <meta key='type' property='og:type' content={post ? 'article' : 'website'} />
      {FACEBOOK_APP_ID && <meta property='fb:app_id' content={FACEBOOK_APP_ID} />}
      <meta property='og:url' content={`${CLIENT_URL}${router.asPath}`} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image ? (
        <>
          <meta
            property='og:image'
            content={pageProps.blogPost ? CLOUDINARY_URL + image.url : image.url}
          />
          <meta property='og:image:type' content={image.mime} />
          <meta property='og:image:width' content={image.width} />
          <meta property='og:image:height' content={image.height} />
        </>
      ) : null}

      {/* Website Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: createStructuredData('website'),
        }}
      />

      {/* Organization Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: createStructuredData('organization'),
        }}
      />

      {/* Blog Post Structured Data */}
      {post ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('post', post),
          }}
        />
      ) : null}

      {/* Video Structured Data */}
      {video ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('video', video),
          }}
        />
      ) : null}

      {/* Breadcrumb Structured Data */}
      {route !== '/' ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('breadcrumbs', route),
          }}
        />
      ) : null}

      {/* FAQ Structured Data */}
      {faqs ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('faq', faqs),
          }}
        />
      ) : null}

      {/* How To Structured Data */}
      {how_to ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: createStructuredData('how_to', how_to),
          }}
        />
      ) : null}

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
