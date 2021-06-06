import FAQ from '@/components/FAQ'

import { getFAQPage, getBlogPosts } from '@/lib/strapi'

function FAQPage({ faqPage }) {
  return <FAQ faqPage={faqPage} />
}

export async function getStaticProps() {
  const faqPage = await getFAQPage()
  const { posts } = await getBlogPosts(0, 6)

  if (!faqPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      faqPage,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default FAQPage
