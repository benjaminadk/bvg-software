import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { CalendarEventFill, ClockFill } from 'react-bootstrap-icons'

import Tags from './Tags'
import Count from './Count'
import CloudinaryImage from '../CloudinaryImage'

import { formatDate, getWhereParameter } from '@/lib/utils'
import { getBlogPosts } from '@/lib/strapi'

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
      <Count totalPosts={totalPosts} tagLogic={tagLogic} setTagLogic={setTagLogic} />
      <Row>
        <InfiniteScroll
          pageStart={0}
          threshold={0}
          loadMore={loadMorePosts}
          hasMore={areMorePosts}
          loader={<div key={start}>Loading...</div>}
        >
          <Col md={{ span: 6, offset: 3 }}>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} passHref>
                <Card as='a' className='PostItem'>
                  <CloudinaryImage image={post.image} />
                  <Card.Body>
                    <Card.Title className='text-info text-center fw-bold'>{post.title}</Card.Title>
                    <Card.Text className='text-dark text-center'>{post.meta_description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='d-flex align-items-end justify-content-between'>
                    <small className='text-muted '>
                      <ClockFill size={12} className='me-2' />
                      <span className='lh-1'>{post.read_time} min read</span>
                    </small>
                    <small className='text-muted '>
                      <CalendarEventFill size={12} className='me-2' />
                      <span className='lh-1'>{formatDate(post.published_on, 0)}</span>
                    </small>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </Col>
        </InfiniteScroll>
      </Row>
    </Container>
  )
}

export default Blog
