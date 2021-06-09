import { useEffect, useState } from 'react'
import Image from 'next/image'

import { CLOUDINARY_URL } from '@/lib/constants'

function CloudinaryImage({ image }) {
  if (image) {
    const [blurImageUrl, setBlurImageUrl] = useState('')
    const [clearImage, setClearImage] = useState()

    useEffect(() => {
      setBlurImageUrl(
        `${CLOUDINARY_URL}${image.url.replace(CLOUDINARY_URL, '')}`.replace(
          '/upload/',
          '/upload/e_blur:1000/'
        )
      )

      setTimeout(() => {
        setBlurImageUrl('')
        setClearImage(image)
      }, 1000)
    }, [image])

    return (
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: `${(image.height / image.width) * 100}%`,
          backgroundImage: `url(${blurImageUrl})`,
          backgroundPosition: 'center center',
          backgroundSize: `100%`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {clearImage && !blurImageUrl ? (
            <Image
              src={clearImage.url.replace(CLOUDINARY_URL, '')}
              alt={clearImage.alt}
              width={clearImage.width}
              height={clearImage.height}
            />
          ) : null}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default CloudinaryImage
