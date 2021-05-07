import Blog from '@/components/Blog'

import { getBlogPage, getBlogPosts } from '@/lib/strapi'

function BlogPage({ blogPosts }) {
  return <Blog blogPosts={blogPosts} />
}

export async function getStaticProps() {
  const blogPage = await getBlogPage()
  const blogPosts = await getBlogPosts()

  if (!blogPosts || !blogPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPage,
      blogPosts,
    },
    revalidate: 1,
  }
}

export default BlogPage
