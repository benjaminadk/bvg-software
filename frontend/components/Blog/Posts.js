import Post from '@/components/Blog/Post'

function Posts({ posts }) {
  return posts.map((post) => <Post key={post.id} post={post} />)
}

export default Posts
