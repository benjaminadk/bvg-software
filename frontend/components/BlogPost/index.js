import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'

import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container>
        <h1>{blogPost.title}</h1>
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

  h1 {
    font-size: 3.2rem;
    font-weight: ${(p) => p.theme.font.bold};
    text-align: center;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: ${(p) => p.theme.font.bold};
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  p > a {
    color: ${(p) => p.theme.color.secondary};
  }

  p,
  li {
    font-size: 1.7rem;
    text-align: justify;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p > code,
  li > code {
    font-size: 1.3rem;
    background-color: ${(p) => lighten(0.4, p.theme.color.secondary)};
    color: ${(p) => p.theme.color.secondary};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  ol {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .filename {
    font-family: ${(p) => p.theme.font.code};
    font-size: 1.6rem;
    border: 1px solid #2a2a2a;
    border-top-right-radius: 0.375rem;
    border-top-left-radius: 0.375rem;
    border-bottom: 0;
    padding: 0.5rem 1rem;
  }
`

BlogPost.propTypes = {
  blogPost: PropTypes.object,
}

export default BlogPost
