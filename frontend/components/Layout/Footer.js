import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import { formatDate } from '@/lib/utils'
import { SOCIAL_MEDIA_ITEMS } from '@/lib/constants'

function Footer({ recentPosts = [] }) {
  return (
    <footer className='Footer'>
      <Container fluid='xxl'>
        <Row className='inner-footer'>
          <Col md={4} className='recent-posts'>
            <h4>Recent Posts</h4>
            <div>
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              ))}
            </div>
          </Col>
          <Col md={4}></Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className='policies'>
              <Link href='/privacy/'>
                <a>Privacy Policy</a>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className='copyright'>
              <span>&copy; {formatDate(Date.now(), 2)} BVG Software. All rights reserved.</span>
              <span>
                <a href='tel:5187914620'>518-791-4620</a>
                <span className='mx-1'>|</span>
                <a href='mailto:tech@bvgsoftware.com'>tech@bvgsoftware.com</a>
              </span>
            </div>
          </Col>
          <Col md={4} className='social-media'>
            {SOCIAL_MEDIA_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Nav.Link className=''>{item.icon}</Nav.Link>
              </Link>
            ))}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
