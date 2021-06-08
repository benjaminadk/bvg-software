import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { useAppDispatch } from '@/lib/context'
import { setShowContactModal } from '@/lib/context/actions'

const DynamicMarkdown = dynamic(() => import('@/components/Markdown'))
const DynamicCloudinaryImage = dynamic(() => import('@/components/CloudinaryImage'))

function FAQ({ faqPage }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onClick(e) {
      e.preventDefault()
      setShowContactModal(dispatch, true)
    }
    document.querySelector('.contact-form-trigger').addEventListener('click', onClick)
  }, [])

  return (
    <Container className='FAQ' fluid='xxl'>
      <Row className='mb-4'>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <DynamicCloudinaryImage image={faqPage.image} />
            <Card.Body>
              <Card.Title className='text-info text-center fw-bold'>{faqPage.title}</Card.Title>
              <Card.Text className='text-center'>{faqPage.meta_description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Accordion defaultActiveKey='0' flush>
            {faqPage.faqs.map((faq, i) => (
              <Accordion.Item key={faq.id} eventKey={i}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                  <DynamicMarkdown source={faq.answer} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

export default FAQ
