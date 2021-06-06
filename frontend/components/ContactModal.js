import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { createContact } from '@/lib/strapi'
import { getRandomInt } from '@/lib/utils'
import { useAppState, useAppDispatch } from '@/lib/context'
import { setShowContactModal } from '@/lib/context/actions'
import { Row } from 'react-bootstrap'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().length(10),
  message: Yup.string().required('Required'),
  answer: Yup.number().required('Required'),
})

function ContactModal() {
  const dispatch = useAppDispatch()

  const { showContactModal } = useAppState()

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
    <Modal
      show={showContactModal}
      onHide={() => setShowContactModal(dispatch, false)}
      aria-labelledby='contact-form-modal'
      className='ContactModal'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contact-form-modal'>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <Form.Group as={Col}>
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
              <Form.Group as={Col}>
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
              <Form.Group as={Col}>
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
              <Form.Group as={Col}>
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
              <Row>
                <Form.Group as={Col} md={{ span: 4, offset: 4 }} className='mb-3 mb-md-0'>
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
                <Form.Group as={Col} md={{ span: 4 }}>
                  <Button type='submit' variant='primary' className='w-100 h-100'>
                    Submit
                  </Button>
                </Form.Group>
              </Row>
              <Col>
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
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default ContactModal
