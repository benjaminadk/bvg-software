import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer({ recentPosts = [] }) {
  return (
    <footer id='Footer'>
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
      </Container>
      <div className='sub-footer'></div>
    </footer>
  )
}

export default Footer
