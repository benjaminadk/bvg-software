import About from '@/components/About'

import { getAboutPage, getBlogPosts } from '@/lib/strapi'

function AboutPage({ aboutPage }) {
  return <About aboutPage={aboutPage} />
}

export async function getStaticProps() {
  const aboutPage = await getAboutPage()
  const { posts } = await getBlogPosts(0, 6)

  if (!aboutPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      aboutPage,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default AboutPage
