import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import CloudinaryImage from '../CloudinaryImage'
import Video from '../Video'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { ChevronRight } from 'react-bootstrap-icons'

import { formatDate } from '@/lib/utils'

function Heading({ post }) {
  const cardRef = useRef()

  const [videoWidth, setVideoWidth] = useState()
  const [videoHeight, setVideoHeight] = useState()

  useEffect(() => {
    function setVideoSize() {
      const { offsetWidth } = cardRef.current
      setVideoWidth(offsetWidth)
      setVideoHeight((offsetWidth * 9) / 16)
    }

    window.addEventListener('resize', setVideoSize)

    setVideoSize()

    return () => {
      window.removeEventListener('resize', setVideoSize)
    }
  }, [])

  const long = useMemo(() => post.title.length > 40, [])

  return (
    <Card ref={cardRef} className='mb-5'>
      {post.video ? (
        <Video video={post.video} width={videoWidth} height={videoHeight} />
      ) : (
        <CloudinaryImage image={post.image} />
      )}
      <Card.Body>
        <div className='d-flex align-items-center justify-content-center lh-1 text-muted'>
          <span>Updated on {formatDate(post.updated_at, 0)}</span>
          <ChevronRight size={10} className='mx-2' />
          <span>{post.read_time} min read</span>
          <ChevronRight size={10} className='mx-2' />
          <span>
            {post.tags.map((tag) => (
              <Link key={tag.name} href='#'>
                <Badge bg='secondary' className='me-1 cursor-pointer'>
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </span>
        </div>
        <Card.Title className={cn('post-title', { long })}>{post.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Heading
