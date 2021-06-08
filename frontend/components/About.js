import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const DynamicVideo = dynamic(() => import('@/components/Video'))
const DynamicMarkdown = dynamic(() => import('@/components/Markdown'))

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
            <DynamicVideo video={aboutPage.video} width={videoWidth} height={videoHeight} />
            <Card.Body>
              <Card.Title className='text-info text-center fw-bold'>
                About | Benjamin Brooke Web Developer
              </Card.Title>
              <DynamicMarkdown source={aboutPage.summary} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About
