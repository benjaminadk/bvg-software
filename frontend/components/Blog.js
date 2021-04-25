import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

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
      {sortedPosts.map(({ id, title, slug }) => (
        <Link key={id} href={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      ))}
    </Container>
  )
}

const Container = styled.div`
  max-width: ${(p) => p.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  a {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${(p) => p.theme.color.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`

export default Blog
