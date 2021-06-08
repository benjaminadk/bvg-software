import { useEffect, useState } from 'react'
import Image from 'next/image'

import { CLOUDINARY_URL } from '@/lib/constants'

function CloudinaryImage({ image }) {
  if (image) {
    const [realImage, setRealImage] = useState()

    useEffect(() => {
      setTimeout(() => {
        setRealImage(image)
      }, 1000)
    }, [])

    const url = `${CLOUDINARY_URL}${image.url.replace(CLOUDINARY_URL, '')}`.replace(
      '/upload/',
      '/upload/e_blur:1000/'
    )

    return (
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: `${(image.height / image.width) * 100}%`,
          backgroundImage: `url(${url})`,
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
          {realImage ? (
            <Image
              src={realImage.url.replace(CLOUDINARY_URL, '')}
              alt={realImage.alt}
              width={realImage.width}
              height={realImage.height}
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
