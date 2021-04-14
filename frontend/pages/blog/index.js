import PropTypes from 'prop-types'

import Blog from '@/components/Blog'

import { getBlogPosts } from '@/lib/strapi'

function BlogPage({ blogPosts }) {
  return <Blog blogPosts={blogPosts} />
}

export async function getStaticProps() {
  const blogPosts = await getBlogPosts()

  if (!blogPosts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPosts,
    },
    revalidate: 1,
  }
}

BlogPage.propTypes = {
  blogPosts: PropTypes.array,
}

export default BlogPage
