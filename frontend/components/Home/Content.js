import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Content({ content }) {
  return (
    <div className='Content'>
      <Container fluid='xxl'>
        <div className='content-grid'>
          {content.map((c) => (
            <Link key={c.id} href={c.href} passHref>
              <Card as='a' className='content-item'>
                <CloudinaryImage image={c.image} />
                <Card.Body>
                  <Card.Title className='text-info text-center fw-bold'>{c.title}</Card.Title>
                  <Card.Text className='text-dark text-center'>{c.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Content
