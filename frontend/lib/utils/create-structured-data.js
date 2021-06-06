import removeMd from 'remove-markdown'

import { BREADCRUMB_MAP, SITE_NAME, CLIENT_URL } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

export default function createStructuredData(type, data = null) {
  let structuredData

  if (type === 'website') {
    structuredData = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: CLIENT_URL,
      sameAs: [
        'https://www.facebook.com/bvgsoftware/',
        'https://www.linkedin.com/in/bvgsoftware/',
        'https://www.youtube.com/channel/UCZ86uFH5o_5yjjBEbi2oFSw',
        'https://github.com/benjaminadk',
      ],
    }
  } else if (type === 'organization') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      legalName: 'BVG Enterprises',
      url: CLIENT_URL,
      logo: CLIENT_URL + '/icons/android-chrome-512x512.png',
      foundingDate: '2016',
      founders: [
        {
          '@type': 'Person',
          name: 'Benjamin Brooke',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3240 S Kerckhoff Ave',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90731',
        addressCountry: 'USA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '[+1518-791-4620]',
        email: 'tech@bvgsoftware.com',
      },
      sameAs: [
        'https://www.facebook.com/bvgsoftware/',
        'https://www.linkedin.com/in/bvgsoftware/',
        'https://www.youtube.com/channel/UCZ86uFH5o_5yjjBEbi2oFSw',
        'https://github.com/benjaminadk',
      ],
    }
  } else if (type === 'post') {
    structuredData = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      image: data.image.url,
      url: `${CLIENT_URL}/blog/${data.slug}/`,
      headline: data.title,
      alternativeHeadline: data.meta_description,
      dateCreated: formatDate(data.created_at, 1),
      datePublished: formatDate(data.published_on, 1),
      dateModified: formatDate(data.updated_at, 1),
      inLanguage: 'en-US',
      contentLocation: {
        '@type': 'Place',
        name: 'Los Angeles, CA',
      },
      author: {
        '@type': 'Person',
        name: 'Benjamin Brooke',
        url: CLIENT_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: CLIENT_URL + '/icons/android-chrome-512x512.png',
        },
      },
      mainEntityOfPage: 'True',
      keywords: [...data.tags.split(','), 'web development', 'software', 'coding'],
      genre: ['Web Development', 'Software Engineering'],
      articleBody: removeMd(data.content),
    }
  } else if (type === 'breadcrumbs') {
    const crumbs = data.split('/').filter((el) => !!el)
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((d, i) => {
        if (['blog', 'courses'].includes(d) && crumbs.length > 1) {
          return {
            '@type': 'ListItem',
            position: i + 1,
            name: BREADCRUMB_MAP[d],
            item: `${CLIENT_URL}/${d}`,
          }
        } else {
          return {
            '@type': 'ListItem',
            position: i + 1,
            name: BREADCRUMB_MAP[d],
          }
        }
      }),
    }
  } else if (type === 'video') {
    structuredData = {
      '@context': 'https://schema.org/',
      '@type': 'VideoObject',
      name: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnail.url,
      embedUrl: `https://www.youtube-nocookie.com/embed/${data.shortcode}`,
      duration: data.duration,
      uploadDate: formatDate(data.uploaded_on, 1),
      author: {
        '@type': 'Person',
        name: 'Benjamin Brooke',
        url: CLIENT_URL,
      },
    }
  } else if (type === 'faq') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.map((d) => {
        return {
          '@type': 'Question',
          name: d.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: removeMd(d.answer),
          },
        }
      }),
    }
  }

  return JSON.stringify(structuredData)
}
