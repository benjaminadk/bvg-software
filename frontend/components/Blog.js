import { useEffect, useState } from 'react'
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
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='list-group list-group-flush'>
            {sortedPosts.map(({ id, title, slug, published_on }) => (
              <li key={id} className='list-group-item d-flex py-3'>
                <span className='badge bg-light text-dark me-3'>
                  {moment(published_on).format('YYYY-MM-DD')}
                </span>
                <Link href={`/blog/${slug}`}>
                  <a className='blog-link'>{title}</a>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
