import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { CalendarEventFill, ClockFill } from 'react-bootstrap-icons'

import Tags from './Tags'
import CloudinaryImage from '../CloudinaryImage'

import { formatDate } from '@/lib/utils'

import { getBlogPosts } from '@/lib/strapi'

class Blog extends Component {
  state = {
    posts: [],
    page: 1,
    limit: 6,
    start: 0,
    totalPosts: null,
    areMorePosts: false,
    tags: ['all posts'],
  }

  async componentDidMount() {
    const { start, limit } = this.state
    const { posts, totalPosts } = await getBlogPosts(start, limit)
    this.setState({ posts, totalPosts })
  }

  loadMorePosts = async () => {}

  handleTagClick = (tag) => {
    const { tags } = this.state
    if (tags.includes(tag)) {
      if (tags.length === 1) {
        this.setState({ tags: ['all posts'] })
      } else {
        this.setState({ tags: tags.filter((t) => t !== tag) })
      }
    } else {
      this.setState({ tags: [...tags, tag] })
    }
  }

  render() {
    const { posts, areMorePosts, start, tags } = this.state

    return (
      <Container fluid='xxl'>
        <Tags blogPosts={posts} selectedTags={tags} onTagClick={this.handleTagClick} />
        <Row>
          <InfiniteScroll
            pageStart={0}
            threshold={100}
            loadMore={this.loadMorePosts}
            hasMore={areMorePosts}
            loader={<div key={start}>Loading...</div>}
          >
            <Col md={{ span: 6, offset: 3 }}>
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} passHref>
                  <Card as='a' className='blog-post-item'>
                    <CloudinaryImage image={post.image} />
                    <Card.Body>
                      <Card.Title className='text-info text-center fw-bold'>
                        {post.title}
                      </Card.Title>
                      <Card.Text className='text-dark text-center'>
                        {post.meta_description}
                      </Card.Text>
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
}

export default Blog
