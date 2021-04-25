import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import moment from 'moment'

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
    </Container>
  )
}

const Container = styled.div`
  max-width: ${(p) => p.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

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
    color: ${(p) => p.theme.color.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`

export default Blog
