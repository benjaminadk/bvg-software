import Link from 'next/link'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Contents({ contents }) {
  return (
    <Alert variant='warning' className='Contents'>
      <Alert.Heading as='h2' className='fw-bold text-center text-md-start'>
        Contents
      </Alert.Heading>
      <p className='text-center text-md-start'>
        Learn everything I know about web development through free blog posts and affordable
        courses.
      </p>
      <hr />
      <div className='contents-grid'>
        {contents.map((content) => (
          <Link key={content.id} href={content.href} passHref>
            <Card as='a' className='contents-item'>
              <CloudinaryImage image={content.image} />
              <Card.Body>
                <Card.Title className='text-info text-center fw-bold'>{content.title}</Card.Title>
                <Card.Text className='text-dark text-center'>{content.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Alert>
  )
}

export default Contents
