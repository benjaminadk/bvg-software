import { useMemo } from 'react'
import Link from 'next/link'
import moment from 'moment'
import cn from 'classnames'

function Heading({ post }) {
  const smallerH1 = useMemo(() => post.title.length > 40, [])

  const updatedAt = useMemo(
    () => moment(post.updated_at).format('MMMM Do, YYYY'),
    [post.updated_at]
  )

  return (
    <div className='card bg-light p-3 mb-5'>
      <div className='card-body'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>Updated on {updatedAt}</li>
            <li className='breadcrumb-item'>{post.read_time} min read</li>
            <li className='breadcrumb-item'>
              {post.tags.map((tag) => (
                <Link key={tag.name} href='#'>
                  <span className='badge bg-secondary cursor-pointer me-1'>
                    {tag.name}
                  </span>
                </Link>
              ))}
            </li>
          </ol>
        </nav>
        <h1 className={cn({ 'fs-3': smallerH1 })}>{post.title}</h1>
      </div>
    </div>
  )
}

export default Heading
