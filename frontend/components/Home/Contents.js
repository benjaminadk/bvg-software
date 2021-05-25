import Link from 'next/link'
import Card from 'react-bootstrap/Card'

import CloudinaryImage from '../CloudinaryImage'

function Contents({ contents }) {
  return (
    <div className='Contents'>
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
    </div>
  )
}

export default Contents
