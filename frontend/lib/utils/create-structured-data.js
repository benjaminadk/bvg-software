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
      legalName: 'BVG Enterprises',
      url: CLIENT_URL,
      logo: '',
      foundingDate: '',
      founders: [
        {
          '@type': 'Person',
          name: 'Benjamin Brooke',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3240 S Kerckhoff Ave',
        addressLocality: '',
        addressRegion: '',
        postalCode: '90731',
        addressCountry: 'USA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '[+]',
        email: 'tech@bvgsoftware.com',
      },
      sameAs: [''],
    }
  } else if (type === 'posts') {
    
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
  } else if (type === 'video') {
    structuredData = {

    }
  }

  return JSON.stringify(structuredData)
}
