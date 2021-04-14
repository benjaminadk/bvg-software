import { SITE_NAME, CLIENT_URL } from '../constants'

export default function createStructuredData(type, data) {
  let structuredData

  if (type === 'website') {
    structuredData = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: CLIENT_URL,
      sameAs: [''],
    }
  } else if (type === 'organization') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      legalName: SITE_NAME,
      url: CLIENT_URL,
      logo: '',
      foundingDate: '',
      founders: [
        {
          '@type': 'Person',
          name: '',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '',
        addressLocality: '',
        addressRegion: '',
        postalCode: '',
        addressCountry: '',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '[+]',
        email: '',
      },
      sameAs: [''],
    }
  } else if (type === 'breadcrumbs') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.map((d, i) => {
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: d.name,
          item: d.href,
        }
      }),
    }
  }

  return JSON.stringify(structuredData)
}
