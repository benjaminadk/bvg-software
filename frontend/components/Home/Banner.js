import Alert from 'react-bootstrap/Alert'

function Banner({ heading, text }) {
  return (
    <Alert variant='warning'>
      <Alert.Heading className='fw-bold'>{heading}</Alert.Heading>
      <p>{text}</p>
    </Alert>
  )
}

export default Banner
