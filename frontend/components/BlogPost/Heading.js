import { useState, useEffect, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import cn from 'classnames'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { ChevronRight } from 'react-bootstrap-icons'

import { formatDate } from '@/lib/utils'

const DynamicVideo = dynamic(() => import('@/components/Video'))
const DynamicCloudinaryImage = dynamic(() => import('@/components/CloudinaryImage'))

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
        <DynamicVideo video={post.video} width={videoWidth} height={videoHeight} />
      ) : (
        <DynamicCloudinaryImage image={post.image} />
      )}
      <Card.Body>
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-center lh-1 text-muted'>
          <span className='mb-1 mb-md-0'>Updated on {formatDate(post.updated_at, 0)}</span>
          <ChevronRight size={10} className='d-none d-md-block mx-2' />
          <span className='mb-1 mb-md-0'>{post.read_time} min read</span>
          <ChevronRight size={10} className='d-none d-md-block mx-2' />
          <span>
            {post.tags.split(',').map((tag) => (
              <Link key={tag} href='#'>
                <Badge bg='secondary' className='me-1 cursor-pointer'>
                  {tag}
                </Badge>
              </Link>
            ))}
          </span>
        </div>
        <Card.Title as='h1' className={cn('post-title', { long })}>
          {post.title}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Heading
