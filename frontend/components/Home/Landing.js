import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ArrowRight } from 'react-bootstrap-icons'

import CloudinaryImage from '../CloudinaryImage'

function Landing({ landing }) {
  const [email, setEmail] = useState('')

  async function onSubmit() {}

  return (
    <div className='Landing'>
      <Alert variant='warning'>
        <Alert.Heading as='h1' className='fs-2 fw-bold'>
          {landing.title}
        </Alert.Heading>
        <p>{landing.description}</p>
        <hr />
        <Row>
          <Col md={6}>
            <p>Here is an outline of the plan:</p>
            <Card>
              <CloudinaryImage image={landing.image} />
            </Card>
          </Col>
          <Col md={6}>
            <p className='mt-2 mt-md-0'>Sign up for newsletter:</p>
            <Card>
              <Card.Body>
                <ul>
                  <li className='list-unstyled m-2'>
                    <span className='li-icon'>
                      <ArrowRight size={20} />
                    </span>
                    <span>Notification when new content is released</span>
                  </li>
                  <li className='list-unstyled m-2'>
                    <span className='li-icon'>
                      <ArrowRight size={20} />
                    </span>
                    <span>Exclusive content</span>
                  </li>
                  <li className='list-unstyled m-2'>
                    <span className='li-icon'>
                      <ArrowRight size={20} />
                    </span>
                    <span>Deals on upcoming courses</span>
                  </li>
                </ul>
                <Form id='klaviyo-signup' onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Control
                      type='email'
                      placeholder='Email Address'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className='text-muted'>
                      I do NOT share email addresses with third parties.
                    </Form.Text>
                  </Form.Group>
                  <Button variant='light' type='submit'>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Alert>
    </div>
  )
}

export default Landing