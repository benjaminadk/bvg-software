import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  return (
    <Container>
      <Markdown source={blogPost.content} className='' />
    </Container>
  )
}

const Container = styled.div``

BlogPost.propTypes = {
  blogPost: PropTypes.object,
}

export default BlogPost
