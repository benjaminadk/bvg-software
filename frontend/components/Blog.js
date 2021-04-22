import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

function Blog({ blogPosts }) {
  return (
    <Container>
      {blogPosts.map(({ id, title, slug }) => (
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
    color: ${(p) => p.theme.color.secondary};

    &:hover {
      text-decoration: underline;
    }
  }
`

Blog.propTypes = {
  blogPosts: PropTypes.array,
}

export default Blog
