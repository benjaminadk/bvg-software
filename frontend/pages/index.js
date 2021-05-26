import Home from '@/components/Home'

import { getHomePage, getBlogPosts } from '@/lib/strapi'

function HomePage({ homePage }) {
  return <Home homePage={homePage} />
}

export async function getStaticProps() {
  const homePage = await getHomePage()
  const { posts } = await getBlogPosts(0, 6)

  if (!homePage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      homePage,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default HomePage
