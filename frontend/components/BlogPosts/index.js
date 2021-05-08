import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tags from './Tags'

import { formatImageUrl } from '@/lib/utils'

function BlogPosts({ blogPosts }) {
  const [selectedTags, setSelectedTags] = useState(['all posts'])
  const [sortedPosts, setSortedPosts] = useState([])

  useEffect(() => {
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
    <Container fluid='xxl'>
      <Tags blogPosts={blogPosts} selectedTags={selectedTags} onTagClick={onTagClick} />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ul className='list-group list-group-flush'>
            {sortedPosts.map(({ id, title, meta_description, slug, video, published_on }) => (
              <li key={id} className='blog-snippet list-group-item py-3'>
                <div className='d-flex flex-column'>
                  <span className='badge bg-light text-dark'>
                    {moment(published_on).format('YYYY-MM-DD')}
                  </span>
                  {video ? (
                    <div>
                      <Image
                        src={formatImageUrl(video.thumbnail.url)}
                        alt={video.thumbnail.alt}
                        width={100}
                        height={56}
                      />
                    </div>
                  ) : null}
                </div>
                <div className='d-flex flex-column'>
                  <Link href={`/blog/${slug}`}>
                    <a>{title}</a>
                  </Link>
                  <p>{meta_description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogPosts
