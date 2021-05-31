import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { formatDate } from '@/lib/utils'
import { SOCIAL_MEDIA_ITEMS } from '@/lib/constants'

function Footer({ recentPosts = [] }) {
  return (
    <footer className='Footer'>
      <Container fluid='xxl'>
        <Row className='footer-top'>
          <Col md={4} className='footer-col'>
            <h4>Services</h4>
            <div>
              <ul>
                <li>Website Design | Development</li>
                <li>Search Engine Optimization</li>
                <li>Digital Marketing | Ads | Email</li>
                <li>Data Management</li>
                <li>Content Creation</li>
              </ul>
              <Button className='contact-us'>Schedule Free Consultation</Button>
            </div>
          </Col>
          <Col md={4} className='footer-col'>
            <h4>Courses</h4>
            <div className='courses-thumbnail'>
              <Image
                src='/v1620641048/thumbnail_c1_6fdfb7567b.png'
                alt='React eCommerce Course Coming Soon'
                width={245}
                height={138}
              />
            </div>
            <p className='mt-3 mb-2'>Coming Soon...</p>
            <blockquote className='mb-0'>
              Comprehensive and affordable tutorials to help developers take their skills to the
              next level
            </blockquote>
          </Col>
          <Col md={4} className='footer-col'>
            <h4>Recent Posts</h4>
            <div>
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className='recent-post'>{post.title}</a>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        <Row className='footer-bottom'>
          <Col md={{ span: 4, order: 1 }} xs={{ span: 12, order: 2 }}>
            <div className='policies'>
              <Link href='/privacy/'>
                <a>Privacy Policy</a>
              </Link>
            </div>
          </Col>
          <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 3 }} className='my-2'>
            <div className='copyright'>
              <span>&copy; {formatDate(Date.now(), 2)} BVG Software. All rights reserved.</span>
              <span>
                <a href='mailto:tech@bvgsoftware.com'>tech@bvgsoftware.com</a>
              </span>
            </div>
          </Col>
          <Col md={{ span: 4, order: 3 }} xs={{ span: 12, order: 1 }}>
            <div className='social-media'>
              {SOCIAL_MEDIA_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Nav.Link className=''>{item.icon}</Nav.Link>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
