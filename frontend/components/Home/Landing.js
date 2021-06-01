import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { ArrowRight } from 'react-bootstrap-icons'

import CloudinaryImage from '../CloudinaryImage'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

function Landing({ landing }) {
  const [status, setStatus] = useState(false)

  async function onSubmit(values, actions) {
    const res = await Axios({
      method: 'POST',
      url: '/api/newsletter',
      data: {
        email: values.email,
      },
    })
    if (res.data.success) {
      setStatus('success')
      actions.resetForm()
    }
  }

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
                {status === 'success' && (
                  <Alert variant='secondary'>Thank you for signing up!</Alert>
                )}
                <Formik
                  initialValues={{
                    email: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ handleSubmit, handleChange, values, touched, errors, submitCount }) =>
                    console.log(errors, submitCount) || (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col}>
                          <FloatingLabel controlId='email' label='Email address' className='mb-1'>
                            <Form.Control
                              type='email'
                              placeholder='Email Address'
                              autoComplete='email'
                              required
                              value={values.email}
                              onChange={handleChange}
                              isValid={touched.email && !errors.email}
                              isInvalid={submitCount && !!errors.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                              {errors.email}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                          <Form.Text className='text-muted'>
                            Email addresses are not sold to 3rd parties
                          </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md={{ span: 3, offset: 9 }}>
                          <Button type='submit' variant='primary' className='mt-1'>
                            Submit
                          </Button>
                        </Form.Group>
                      </Form>
                    )
                  }
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Alert>
    </div>
  )
}

export default Landing
