import { useState } from 'react'
import dynamic from 'next/dynamic'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { ArrowRight } from 'react-bootstrap-icons'

import CloudinaryImage from '../CloudinaryImage'

const DynamicKlaviyoForm = dynamic(() => import('@/components/Home/KlaviyoForm'))

function Landing({ landing }) {
  const [status, setStatus] = useState('')

  return (
    <div className='Landing'>
      <Alert variant='warning'>
        <Alert.Heading as='h1' className='fs-2 fw-bold text-center text-md-start'>
          {landing.title}
        </Alert.Heading>
        <p className='text-center text-md-start'>{landing.description}</p>
        <hr />
        <Row>
          <Col md={6}>
            <p>Here is an outline of the plan:</p>
            <Card>
              <CloudinaryImage image={landing.image} />
            </Card>
          </Col>
          <Col md={6}>
            <p className='mt-2 mt-md-0'>Here&apos;s what you can do:</p>
            <Card>
              <Card.Body>
                <Card.Title as='h3' className='mb-4'>
                  Newsletter
                </Card.Title>
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
                {status ? (
                  <Alert variant='secondary'>
                    {status === 'success'
                      ? 'Thank you for signing up.'
                      : 'Whoops. Something went wrong.'}
                  </Alert>
                ) : null}
                <DynamicKlaviyoForm setStatus={setStatus} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Alert>
    </div>
  )
}

export default Landing
