import PropTypes from 'prop-types'
import BlogPost from '@/components/BlogPost'
import { getBlogPostSlugs, getBlogPostBySlug } from '@/lib/strapi'

function BlogPostPage({ blogPost }) {
  return <BlogPost blogPost={blogPost} />
}

export async function getStaticPaths() {
  const slugs = await getBlogPostSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const blogPost = await getBlogPostBySlug(params.slug)

  if (!blogPost) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPost,
    },
    revalidate: 1,
  }
}

BlogPostPage.propTypes = {
  blogPost: PropTypes.object,
}

export default BlogPostPage
