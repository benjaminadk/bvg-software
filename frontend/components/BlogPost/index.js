import React, { useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import moment from 'moment'
import { ChevronRight } from '@styled-icons/boxicons-regular'

import Minesweeper from '../visualizations/Minesweeper'
import HighSchoolClock from '../visualizations/HighSchoolClock'
import SimpleBinarySearchTree from '../visualizations/SimpleBinarySearchTree'
import Markdown from '../Markdown'

function BlogPost({ blogPost }) {
  if (blogPost) {
    console.log(blogPost)
    const updatedAt = useMemo(
      () => moment(blogPost.updated_at).format('MMMM Do, YYYY'),
      [blogPost.updated_at]
    )

    return (
      <Container>
        <div className='heading'>
          <div className='meta-data'>
            <div className='date'>Updated on {updatedAt}</div>
            <ChevronRight size={20} />
            <div className='read-time'>{blogPost.read_time} min read</div>
            <ChevronRight size={20} />
            <div className='tags'>
              {blogPost.tags.map((tag) => (
                <Link key={tag.name} href='#'>
                  <a>#{tag.name}</a>
                </Link>
              ))}
            </div>
          </div>
          <h1>{blogPost.title}</h1>
        </div>

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

  .heading {
    display: flex;
    flex-direction: column;

    .meta-data {
      display: flex;
      align-items: center;

      .date {
        font-size: 1.5rem;
        color: ${(p) => p.theme.color.secondary};
      }

      .read-time {
        font-size: 1.5rem;
        color: ${(p) => p.theme.color.secondary};
      }

      .tags {
        display: flex;
        align-items: center;

        a {
          font-size: 1.5rem;
          font-weight: ${(p) => p.theme.font.normal};
          background-color: ${(p) => p.theme.color.secondary};
          color: ${(p) => p.theme.color.white};
          border-radius: ${(p) => p.theme.borderRadius};
          padding: 0.3rem 0.75rem;
          margin-right: 0.5rem;
          transition: background-color 0.2s ease-in;

          &:hover {
            background-color: ${(p) => p.theme.color.primary};
          }
        }

        span {
          font-size: 1.4rem;
        }
      }

      svg {
        color: ${(p) => p.theme.color.secondary};
        margin: 0 0.6rem;
      }
    }

    h1 {
      font-size: 3.2rem;
      font-weight: ${(p) => p.theme.font.normal};
      margin: 1rem 0 3rem;
    }
  }
`

export default BlogPost
