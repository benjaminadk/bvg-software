import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Author() {
  return (
    <div className='Author card bg-light my-5'>
      <div className='row g-0'>
        <div className='col-md-3 d-flex justify-content-center align-items-center'>
          <Image
            src='benjamin_brooke_114909d05e.png'
            alt='Benjamin Brooke Avatar'
            width={100}
            height={100}
          />
        </div>
        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title fw-bold text-center text-md-start'>Benjamin Brooke</h5>
            <p className='card-text text-center text-md-start'>
              Hi, I&apos;m Ben. I work as a full stack developer for an eCommerce company. My goal
              is to share knowledge through my{' '}
              <Link href='/blog'>
                <a className='text-info fw-bold'>blog</a>
              </Link>{' '}
              and{' '}
              <Link href='/courses'>
                <a className='text-info fw-bold'>courses</a>
              </Link>
              . In my free time I enjoy cycling and rock climbing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Author
