import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Services({ services }) {
  return (
    <Alert variant='warning' className='Services'>
      <Alert.Heading className='fw-bold'>Services</Alert.Heading>
      <p>I offer a wide range of freelance services. Contact me to schedule a free consultation.</p>
      <hr />
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
    </Alert>
  )
}

export default Services
