import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Services({ services }) {
  return (
    <div className='Services'>
      <Container fluid='xxl'>
        <div className='services-grid'>
          {services.map((service) => (
            <Card key={service.id}>
              <CloudinaryImage image={service.image} />
              <Card.Body>
                <Card.Title className='text-info text-center fw-bold'>{service.title}</Card.Title>
                <Card.Text className='text-center'>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Services
