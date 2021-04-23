import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

import Minesweeper from '../visualizations/Minesweeper'
import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <Container>
        <h1>{blogPost.title}</h1>
        {blogPost.slug === 'minesweeper' && <Minesweeper />}
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

  h2 {
    font-size: 2.6rem;
    font-weight: ${(p) => p.theme.font.bold};
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: ${(p) => p.theme.font.bold};
    margin-top: 4rem;
  }

  p > a {
    color: ${(p) => p.theme.color.secondary};

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 1.7rem;
    text-align: justify;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p > code,
  li > code {
    font-size: 1.3rem;
    background-color: ${(p) => lighten(0.5, p.theme.color.secondary)};
    color: ${(p) => p.theme.color.secondary};
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
  }

  ul {
    padding-left: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  ol {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 1.6rem;
    border: 1px solid ${(p) => p.theme.color.gray200};
    margin-bottom: 3rem;
  }

  table th {
    background-color: ${(p) => p.theme.color.white};
    padding: 0.5rem 1rem;
  }

  table td {
    padding: 0.5rem 1rem;
  }

  table tr {
    background-color: ${(p) => p.theme.color.white};
  }

  table tr:nth-child(odd) {
    background-color: ${(p) => p.theme.color.gray100};
  }

  .filename {
    font-family: ${(p) => p.theme.font.code};
    font-size: 1.6rem;
    background-color: ${(p) => p.theme.color.gray100};
    border: 1px solid ${(p) => p.theme.color.black};
    border-top-right-radius: 0.375rem;
    border-top-left-radius: 0.375rem;
    border-bottom: 0;
    padding: 0.5rem 1rem;
  }

  .flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-line {
    display: flex;
    align-items: center;
  }

  .mr-1 {
    margin-right: 1rem;
  }

  .mt-5 {
    margin-top: 5rem;
  }
`

export default BlogPost
