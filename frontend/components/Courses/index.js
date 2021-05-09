import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { formatImageUrl } from '@/lib/utils'

function Courses({ courses }) {
  const course = courses[0]
  console.log(course)
  return (
    <Container fluid='xxl'>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Image
              src={formatImageUrl(course.image.url)}
              alt={course.image.alt}
              width={course.image.width}
              height={course.image.height}
            />
            <Card.Body>
              <Card.Title className='text-info fw-bold'>{course.title}</Card.Title>
              <Card.Text>{course.meta_description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Courses
