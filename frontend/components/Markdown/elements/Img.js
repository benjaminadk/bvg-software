import { memo } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import styled from 'styled-components'
import Image from 'next/image'

function Img({ src, alt, width, height }) {
  if (!width) return null
  return (
    <SRLWrapper>
      <Container>
        <div className='image-wrapper'>
          <Image src={src} alt={alt} width={width} height={height} />
        </div>

        {alt && <figcaption>{alt}</figcaption>}
      </Container>
    </SRLWrapper>
  )
}

const Container = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem auto;
  cursor: zoom-in;

  .image-wrapper {
    display: grid;
    place-items: center center;
    box-shadow: ${(p) => p.theme.shadows[2]};
  }

  figcaption {
    font-size: 1.5rem;
    font-weight: ${(p) => p.theme.font.bold};
    color: ${(p) => p.theme.color.gray400};
    margin-top: 2rem;
  }
`

export default memo(Img)
