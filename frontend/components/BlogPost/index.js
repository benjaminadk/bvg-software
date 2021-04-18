import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container>
        <Markdown source={blogPost.content} className='blog-post' />
      </Container>
    )
  } else {
    return null
  }
}

const Container = styled.article`
  width: 700px;
  margin: 0 auto;

  h2 {
    font-size: 2.4rem;
  }

  p {
    font-size: 1.7rem;
    text-align: justify;
  }
`

BlogPost.propTypes = {
  blogPost: PropTypes.object,
}

export default BlogPost
