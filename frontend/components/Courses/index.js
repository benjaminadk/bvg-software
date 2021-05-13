import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Courses({ courses }) {
  const course = courses[0]

  return (
    <Container fluid='xxl'>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <CloudinaryImage image={course.image} />
            <Card.Body>
              <Card.Title className='text-info text-center fw-bold'>{course.title}</Card.Title>
              <Card.Text className='text-center'>{course.meta_description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Courses
