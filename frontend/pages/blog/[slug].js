import BlogPost from '@/components/BlogPost'
import { getBlogPostSlugs, getBlogPostBySlug, getBlogPosts } from '@/lib/strapi'

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
  const { posts } = await getBlogPosts(0, 6)

  if (!posts || !blogPost) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPost,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default BlogPostPage
