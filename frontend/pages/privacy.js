import Privacy from '@/components/Privacy'

import { getPrivacyPage, getBlogPosts } from '@/lib/strapi'

function PrivacyPage() {
  return <Privacy />
}

export async function getStaticProps() {
  const privacyPage = await getPrivacyPage()
  const { posts } = await getBlogPosts(0, 6)

  if (!privacyPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      privacyPage,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default PrivacyPage
