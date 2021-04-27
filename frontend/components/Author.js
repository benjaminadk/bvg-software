import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

function Author() {
  return (
    <Container>
      <div className='author-wrapper'>
        <div className='image-wrapper'>
          <Image
            src={`/about/benjamin-brooke.png`}
            alt='Benjamin Brooke Avatar'
            width={100}
            height={100}
          />
        </div>
        <div className='content-wrapper'>
          <p>
            Benjamin Brooke is a former pizza chef. He saw an ad for a now
            defunct coding school on YouTube {new Date().getFullYear() - 2015}{' '}
            years ago and has been programming every day since. When Ben
            isn&apos;t in front of a screen he enjoys cycling and rock climbing.
          </p>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: ${(p) => p.theme.maxWidth};
  display: grid;
  place-items: center center;
  background-color: ${(p) => p.theme.color.gray100};
  border-radius: ${(p) => p.theme.borderRadius};
  margin: 0 auto 4rem;
  padding: 2rem;

  .author-wrapper {
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-items: center;
  }

  .image-wrapper {
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center center;
    border-radius: 50%;
  }

  .content-wrapper {
    p {
      font-size: 1.8rem;
      text-align: justify;
    }
  }
`

export default Author
