import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import { CalendarEventFill, ClockFill } from 'react-bootstrap-icons'

import CloudinaryImage from '@/components/CloudinaryImage'

import { formatDate } from '@/lib/utils'

function Post({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
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
  )
}

export default Post
