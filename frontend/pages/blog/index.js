import Blog from '@/components/Blog'

import { getBlogPage, getBlogPosts } from '@/lib/strapi'

function BlogPage() {
  return <Blog />
}

export async function getStaticProps() {
  const blogPage = await getBlogPage()
  const { posts } = await getBlogPosts(0, 6)

  if (!posts || !blogPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPage,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default BlogPage
