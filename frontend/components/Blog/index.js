import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import Tags from './Tags'

function Blog({ blogPosts }) {
  const [selectedTags, setSelectedTags] = useState(['all posts'])
  const [sortedPosts, setSortedPosts] = useState([])

  useEffect(() => {
    console.log('UF')
    setSortedPosts(
      blogPosts
        .slice()
        .filter((el) => {
          if (selectedTags.includes('all posts')) {
            return el
          } else {
            for (let tagName of selectedTags) {
              return el.tags.find((t) => t.name === tagName)
            }
          }
        })
        .sort((a, b) => {
          return new Date(b.published_on) - new Date(a.published_on)
        })
    )
  }, [selectedTags])

  function onTagClick(tag) {
    if (tag === 'all posts') {
      setSelectedTags(['all posts'])
    } else if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter((el) => el !== tag))
      } else {
        setSelectedTags(['all posts'])
      }
    } else {
      if (selectedTags.includes('all posts')) {
        setSelectedTags([...selectedTags.filter((el) => el !== 'all posts'), tag])
      } else {
        setSelectedTags([...selectedTags, tag])
      }
    }
  }

  return (
    <div className='container'>
      <Tags blogPosts={blogPosts} selectedTags={selectedTags} onTagClick={onTagClick} />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='list-group list-group-flush'>
            {sortedPosts.map(({ id, title, meta_description, slug, video, published_on }) => (
              <li key={id} className='blog-snippet list-group-item d-flex py-3'>
                <div className='d-flex flex-column'>
                  <span className='badge align-self-start bg-light text-dark me-3'>
                    {moment(published_on).format('YYYY-MM-DD')}
                  </span>
                </div>
                <div className='d-flex flex-column'>
                  <Link href={`/blog/${slug}`}>
                    <a className='fs-6 fw-bold'>{title}</a>
                  </Link>
                  <p className='mb-0'>{meta_description}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
