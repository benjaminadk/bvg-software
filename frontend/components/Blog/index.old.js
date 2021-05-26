import { useState, useEffect } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { CalendarEventFill, ClockFill } from 'react-bootstrap-icons'

import Tags from './Tags'
import CloudinaryImage from '../CloudinaryImage'

import { formatDate } from '@/lib/utils'

function Blog({ blogPosts }) {
  const [selectedTags, setSelectedTags] = useState(['all posts'])
  const [sortedPosts, setSortedPosts] = useState([])

  useEffect(() => {
    setSortedPosts(
      blogPosts
        .slice()
        .filter((el) => {
          if (selectedTags.includes('all posts')) {
            return true
          } else {
            for (let tagName of selectedTags) {
              if (el.tags.find((t) => t.name === tagName)) {
                return true
              }
            }
            return false
          }
        })
        .sort((a, b) => {
          return new Date(b.published_on) - new Date(a.published_on)
        })
    )
  }, [selectedTags])

  function onTagClick(tag) {
    if (tag === 'all posts') {
      setSelectedTags(['all posts'])
    } else if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter((el) => el !== tag))
      } else {
        setSelectedTags(['all posts'])
      }
    } else {
      if (selectedTags.includes('all posts')) {
        setSelectedTags([...selectedTags.filter((el) => el !== 'all posts'), tag])
      } else {
        setSelectedTags([...selectedTags, tag])
      }
    }
  }

  return (
    <Container fluid='xxl'>
      <Tags blogPosts={blogPosts} selectedTags={selectedTags} onTagClick={onTagClick} />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {sortedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} passHref>
              <Card as='a' className='blog-post-item'>
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
      </Row>
    </Container>
  )
}

export default Blog
