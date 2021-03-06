import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object as yupObject, string as yupString, number as yupNumber } from 'yup'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { createContact } from '@/lib/strapi'
import { getRandomInt } from '@/lib/utils'

const validationSchema = yupObject().shape({
  firstName: yupString().required('Required'),
  lastName: yupString().required('Required'),
  email: yupString().email('Invalid email').required('Required'),
  phone: yupString().length(10, 'Use 10 digits'),
  message: yupString().required('Required'),
  answer: yupNumber().required('Required'),
})

function Contact() {
  const [status, setStatus] = useState(false)
  const [var1, setVar1] = useState()
  const [var2, setVar2] = useState()

  useEffect(() => {
    setVar1(getRandomInt())
    setVar2(getRandomInt())
  }, [])

  async function onSubmit(values, actions) {
    const { firstName, lastName, email, phone, message, answer } = values
    if (answer === var1 + var2) {
      const contact = await createContact({ firstName, lastName, email, phone, message })
      if (contact) {
        setStatus('success')
        actions.resetForm()
      } else {
        setStatus('danger')
      }
    } else {
      actions.setFieldError('answer', 'Incorrect')
    }
  }

  return (
    <Alert variant='warning' className='Contact'>
      <Alert.Heading as='h2' className='fw-bold text-center text-md-start'>
        Contact Us
      </Alert.Heading>
      <p className='text-center text-md-start'>
        Free Consultations. Questions and comments are also welcome.
      </p>
      <hr />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          answer: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors, submitCount }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md={6}>
                <FloatingLabel controlId='firstName' label='First Name' className='mb-3'>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    autoComplete='given-name'
                    required
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={submitCount && !!errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <FloatingLabel controlId='lastName' label='Last Name' className='mb-3'>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    autoComplete='family-name'
                    required
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={submitCount && !!errors.lastName}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md={6}>
                <FloatingLabel controlId='email' label='Email Address' className='mb-3'>
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
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <FloatingLabel controlId='phone' label='Phone Number' className='mb-3'>
                  <Form.Control
                    type='text'
                    placeholder='Phone Number'
                    autoComplete='tel'
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={submitCount && !!errors.phone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <FloatingLabel controlId='message' label='Message' className='mb-3'>
                  <Form.Control
                    as='textarea'
                    style={{ height: '200px' }}
                    placeholder='Message'
                    required
                    value={values.message}
                    onChange={handleChange}
                    isValid={touched.message && !errors.message}
                    isInvalid={submitCount && !!errors.message}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.message}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md={{ span: 2, order: 2 }} className='mb-3 mb-md-0'>
                <FloatingLabel controlId='answer' label={`${var1} + ${var2} = ?`}>
                  <Form.Control
                    type='number'
                    placeholder={`${var1} + ${var2} = ?`}
                    required
                    value={values.answer}
                    onChange={handleChange}
                    isValid={touched.answer && !errors.answer}
                    isInvalid={submitCount && !!errors.answer}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.answer}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Col md={{ span: 8, order: 1 }}>
                {status === 'success' && (
                  <Alert variant='secondary' className='mb-0'>
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </Alert>
                )}
                {status === 'danger' && (
                  <Alert variant='danger' className='mb-0'>
                    Oops. There was an error processing your message.
                  </Alert>
                )}
              </Col>
              <Form.Group as={Col} md={{ span: 2, order: 3 }} className='mb-3 mb-md-0'>
                <Button type='submit' variant='primary' className='mt-3 mt-md-0'>
                  Submit
                </Button>
              </Form.Group>
            </Row>
          </Form>
        )}
      </Formik>
    </Alert>
  )
}

export default Contact
