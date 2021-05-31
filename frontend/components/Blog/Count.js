import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import cn from 'classnames'

function Count({ totalPosts, tagLogic, setTagLogic }) {
  return (
    <Row className='Count'>
      <Col md={{ span: 6, offset: 3 }} className='count-container'>
        <div className='tag-logic d-flex align-items-center'>
          Tag Logic:
          <Badge className={cn({ active: tagLogic === 'or' })}>or</Badge>
          <Form.Switch onChange={() => setTagLogic(tagLogic === 'and' ? 'or' : 'and')} />
          <Badge className={cn({ active: tagLogic === 'and' })}>and</Badge>
        </div>
        <div className='total d-flex align-items-center'>
          Total Posts: <Badge>{totalPosts}</Badge>
        </div>
      </Col>
    </Row>
  )
}

export default Count
