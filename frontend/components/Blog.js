import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import moment from 'moment'

import Heading from './Heading'

function Blog({ blogPosts }) {
  const [sortedPosts, setSortedPosts] = useState([])

  useEffect(() => {
    setSortedPosts(
      blogPosts.slice().sort((a, b) => {
        return new Date(b.published_on) - new Date(a.published_on)
      })
    )
  }, [])

  return (
    <Container>
      <Heading>
        <h1>Posts</h1>
      </Heading>
      <div className='content'>
        {sortedPosts.map(({ id, title, slug, published_on }) => (
          <div key={id} className='post'>
            <div className='date'>
              {moment(published_on).format('YYYY-MM-DD')}
            </div>
            <Link href={`/blog/${slug}`}>
              <a>{title}</a>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
  h1 {
    font-size: 3.2rem;
    font-weight: ${(p) => p.theme.font.normal};
    margin: 0;
  }

  .content {
    max-width: ${(p) => p.theme.maxWidth};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  }

  .post {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .date {
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.secondary};
    margin-right: 1rem;
  }

  a {
    font-size: 2rem;
    font-weight: ${(p) => p.theme.font.normal};
    color: ${(p) => p.theme.color.black};

    &:hover {
      color: ${(p) => p.theme.color.primary};
      text-decoration: underline;
    }
  }
`

export default Blog
