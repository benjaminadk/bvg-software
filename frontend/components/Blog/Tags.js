import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import cn from 'classnames'

import { getBlogPostTags } from '@/lib/strapi'

function Tags({ selectedTags, onTagClick }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    async function fetchTags() {
      let allTags = await getBlogPostTags()
      setTags(allTags)
    }
    fetchTags()
  }, [])

  return (
    <Row className='Tags'>
      <Col md={{ span: 6, offset: 3 }} className='d-flex justify-content-center flex-wrap'>
        {['all posts', ...tags].map((tag) => (
          <Button
            key={tag}
            className={cn('tag btn btn-sm ms-2 mb-2', {
              'tag-active': selectedTags.includes(tag),
            })}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </Button>
        ))}
      </Col>
    </Row>
  )
}

export default Tags
