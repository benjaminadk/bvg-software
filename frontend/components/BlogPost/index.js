import dynamic from 'next/dynamic'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Heading from './Heading'

const DynamicMinesweeper = dynamic(() => import('@/components/visualizations/Minesweeper'))
const DynamicHighSchoolClock = dynamic(() => import('@/components/visualizations/HighSchoolClock'))
const DynamicSimpleBinarySearchTree = dynamic(() =>
  import('@/components/visualizations/SimpleBinarySearchTree')
)
const DynamicLadcSampleSales = dynamic(() => import('@/components/visualizations/LadcSampleSales'))
const DynamicAuthor = dynamic(() => import('@/components/BlogPost/Author'))
const DynamicMarkdown = dynamic(() => import('@/components/Markdown'))

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container className='BlogPost' fluid='xxl'>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Heading post={blogPost} />
            <div>
              {blogPost.slug === 'minesweeper' && <DynamicMinesweeper />}
              {blogPost.slug === 'high-school-clock' && <DynamicHighSchoolClock />}
              {blogPost.slug === 'simple-binary-search-tree' && <DynamicSimpleBinarySearchTree />}
              {blogPost.slug === 'ladc-sample-sales' && <DynamicLadcSampleSales />}
              <DynamicMarkdown source={blogPost.content} />
            </div>
            <DynamicAuthor />
          </Col>
        </Row>
      </Container>
    )
  } else {
    return null
  }
}

export default BlogPost
