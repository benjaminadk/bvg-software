import { Fragment, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import InfiniteScroll from 'react-infinite-scroller'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tags from './Tags'
import Post from '@/components/Blog/Post'

import { getWhereParameter } from '@/lib/utils'
import { getBlogPosts } from '@/lib/strapi'

const DynamicCount = dynamic(() => import('@/components/Blog/Count'))
const DynamicPosts = dynamic(() => import('@/components/Blog/Posts'))

const limit = 6

function Blog() {
  const [posts, setPosts] = useState([])
  const [start, setStart] = useState(0)
  const [totalPosts, setTotalPosts] = useState()
  const [areMorePosts, setAreMorePosts] = useState(false)
  const [tags, setTags] = useState(['all posts'])
  const [tagLogic, setTagLogic] = useState('or')

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (tags.length === 1 && tags[0] === 'all posts') {
      fetchPosts()
    } else {
      refetchPosts()
    }
  }, [tags, tagLogic])

  async function fetchPosts() {
    const payload = await getBlogPosts(0, limit)
    setPosts(payload.posts)
    setTotalPosts(payload.totalPosts)
    setAreMorePosts(payload.totalPosts > payload.posts.length)
    setStart(limit)
  }

  async function refetchPosts() {
    const where = getWhereParameter(tags, tagLogic)
    const payload = await getBlogPosts(0, limit, where)
    setPosts(payload.posts)
    setTotalPosts(payload.totalPosts)
    setAreMorePosts(payload.totalPosts > payload.posts.length)
    setStart(limit)
  }

  async function loadMorePosts() {
    const payload = await getBlogPosts(start, limit)
    setPosts([...posts, ...payload.posts])
    setTotalPosts(payload.totalPosts)
    setAreMorePosts(payload.totalPosts > [...posts, ...payload.posts].length)
    setStart((current) => current + limit)
  }

  function handleTagClick(tag) {
    if (tag === 'all posts') {
      setTags(['all posts'])
    } else if (tags.includes(tag)) {
      if (tags.length === 1) {
        setTags(['all posts'])
      } else {
        setTags(tags.filter((t) => t !== tag))
      }
    } else {
      setTags([...tags.filter((t) => t !== 'all posts'), tag])
    }
  }

  return (
    <Container fluid='xxl'>
      <Tags blogPosts={posts} selectedTags={tags} onTagClick={handleTagClick} />
      <DynamicCount totalPosts={totalPosts} tagLogic={tagLogic} setTagLogic={setTagLogic} />
      <Row>
        <InfiniteScroll
          pageStart={0}
          threshold={0}
          loadMore={loadMorePosts}
          hasMore={areMorePosts}
          loader={<div key={start}>Loading...</div>}
        >
          <Col md={{ span: 6, offset: 3 }}>
            {posts.length ? (
              <Fragment>
                <Post post={posts[0]} />
                <DynamicPosts posts={posts.slice(1)} />
              </Fragment>
            ) : null}
          </Col>
        </InfiniteScroll>
      </Row>
    </Container>
  )
}

export default Blog
