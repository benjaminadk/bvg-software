import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { media } from './styles'
import { formatImageUrl } from '@/lib/utils'

function Video({ video, isHomePage }) {
  const [loaded, setLoaded] = useState(false)

  if (video) {
    return (
      <Container isHomePage={isHomePage}>
        <div className='desktop-video'>
          {loaded ? (
            <iframe
              width={isHomePage ? '800' : '560'}
              height={isHomePage ? '448' : '315'}
              src={`https://www.youtube-nocookie.com/embed/${video.shortcode}?modestbranding=1&&rel=0&showinfo=0&autoplay=1`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          ) : (
            <div className='placeholder' onClick={() => setLoaded(true)}>
              <Image
                src={formatImageUrl(video.thumbnail.url)}
                alt={video.thumbnail.alt}
                width={video.thumbnail.width}
                height={video.thumbnail.height}
                layout='responsive'
              />
              <div className='play-button'>
                <svg
                  height='100%'
                  version='1.1'
                  viewBox='0 0 68 48'
                  width='100%'
                >
                  <path
                    className='button-background'
                    d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
                    fill='#f00'
                  ></path>
                  <path d='M 45,24 27,14 27,34' fill='#fff'></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </Container>
    )
  } else {
    return null
  }
}

const Container = styled.div`
  display: grid;
  place-items: center center;
  margin: 3rem 0;

  .desktop-video {
    display: grid;
    place-items: center center;
    box-shadow: ${(p) => p.theme.shadows[2]};

    iframe {
      width: ${(p) => (p.isHomePage ? '800px' : '560px')};
      height: ${(p) => (p.isHomePage ? '448px' : '315px')};

      ${media.phone`
         width: 95vw;
         height: calc(95vw * 9/16);
      `}
    }

    .placeholder {
      width: ${(p) => (p.isHomePage ? '800px' : '560px')};
      height: ${(p) => (p.isHomePage ? '448px' : '315px')};
      position: relative;
      cursor: pointer;

      ${media.phone`
         width: 95vw;
         height: calc(95vw * 9/16);
      `}

      .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68px;
        height: 48px;
        display: grid;
        place-items: center center;
        transition: background-color 0.25s cubic-bezier(0, 0, 0.2, 1);

        .button-background {
          transition: fill 0.1s cubic-bezier(0.4, 0, 1, 1),
            fill-opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
          fill: #212121;
          fill-opacity: 0.8;
        }
      }

      &:hover .button-background {
        fill: red;
        fill-opacity: 1;
      }
    }
  }
`

export default Video
