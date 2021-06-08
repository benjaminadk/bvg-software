import { Formik } from 'formik'
import { object as yupObject, string as yupString } from 'yup'
import Axios from 'axios'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'

const validationSchema = yupObject().shape({
  email: yupString().email('Invalid email').required('Required'),
})

function KlaviyoForm({ setStatus }) {
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
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, submitCount }) => (
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
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
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
      )}
    </Formik>
  )
}

export default KlaviyoForm
