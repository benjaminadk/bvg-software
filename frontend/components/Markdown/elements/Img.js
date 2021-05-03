import { memo } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import Image from 'next/image'

function Img({ src, alt, width, height }) {
  if (!width) return null
  return (
    <SRLWrapper>
      <figure className='figure d-flex flex-column align-items-center my-5 cursor-zoom-in'>
        <div className='image-wrapper'>
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
        {alt && <figcaption className='figure-caption'>{alt}</figcaption>}
      </figure>
    </SRLWrapper>
  )
}

export default memo(Img)
