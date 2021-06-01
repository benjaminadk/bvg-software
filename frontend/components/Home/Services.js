import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Services({ services }) {
  return (
    <Alert variant='warning' className='Services'>
      <Alert.Heading as='h2' className='fw-bold text-center text-md-start'>
        Services
      </Alert.Heading>
      <p className='text-center text-md-start'>
        We offer a wide range of web related services. Contact us to schedule a free consultation.
      </p>
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
