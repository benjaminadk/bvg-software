import { useState, useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Video from '@/components/Video'
import Markdown from '@/components/Markdown'

function About({ aboutPage }) {
  const cardRef = useRef()

  const [videoWidth, setVideoWidth] = useState()
  const [videoHeight, setVideoHeight] = useState()

  useEffect(() => {
    function setVideoSize() {
      const { offsetWidth } = cardRef.current
      setVideoWidth(offsetWidth)
      setVideoHeight((offsetWidth * 9) / 16)
    }

    window.addEventListener('resize', setVideoSize)
    setVideoSize()

    return () => {
      window.removeEventListener('resize', setVideoSize)
    }
  }, [])

  return (
    <Container fluid='xxl'>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card ref={cardRef}>
            <Video video={aboutPage.video} width={videoWidth} height={videoHeight} />
            <Card.Body>
              <Card.Title className='text-info text-center fw-bold'>
                About | Benjamin Brooke Web Developer
              </Card.Title>
              <Markdown source={aboutPage.summary} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About
