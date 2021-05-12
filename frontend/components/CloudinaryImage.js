import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Cloudinary } from 'cloudinary-core'

const cl = new Cloudinary({ cloud_name: 'bvgsoftware', secure: true })

function CloudinaryImage({ image }) {
  if (image) {
    const [realImage, setRealImage] = useState()

    useEffect(() => {
      setTimeout(() => {
        setRealImage(image)
      }, 2000)
    }, [])

    const url = cl.url(image.url, { transformation: [{ effect: 'blur:100' }] })

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
              src={realImage.url}
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
