import React from 'react'
import styled from 'styled-components'

import Minesweeper from '../visualizations/Minesweeper'
import HighSchoolClock from '../visualizations/HighSchoolClock'
import SimpleBinarySearchTree from '../visualizations/SimpleBinarySearchTree'
import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container>
        <h1>{blogPost.title}</h1>
        {blogPost.slug === 'minesweeper' && <Minesweeper />}
        {blogPost.slug === 'high-school-clock' && <HighSchoolClock />}
        {blogPost.slug === 'simple-binary-search-tree' && (
          <SimpleBinarySearchTree />
        )}
        <Markdown source={blogPost.content} className='blog-post' />
      </Container>
    )
  } else {
    return null
  }
}

const Container = styled.article`
  width: 700px;
  margin: 0 auto 10rem;

  h1 {
    font-size: 3.2rem;
    font-weight: ${(p) => p.theme.font.bold};
    text-align: center;
    margin-bottom: 3rem;
  }
`

export default BlogPost
