import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Minesweeper from '../visualizations/Minesweeper'
import HighSchoolClock from '../visualizations/HighSchoolClock'
import SimpleBinarySearchTree from '../visualizations/SimpleBinarySearchTree'
import Heading from './Heading'
import Markdown from '../Markdown'
import Author from './Author'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container id='BlogPost'>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Heading post={blogPost} />
            <div>
              {blogPost.slug === 'minesweeper' && <Minesweeper />}
              {blogPost.slug === 'high-school-clock' && <HighSchoolClock />}
              {blogPost.slug === 'simple-binary-search-tree' && <SimpleBinarySearchTree />}
              <Markdown source={blogPost.content} />
            </div>
            <Author />
          </Col>
        </Row>
      </Container>
    )
  } else {
    return null
  }
}

export default BlogPost
