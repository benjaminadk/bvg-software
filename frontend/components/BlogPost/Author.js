import React from 'react'
import Image from 'next/image'

function Author() {
  return (
    <div className='card bg-light my-5'>
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
            <h5 className='card-title fw-bold'>Benjamin Brooke</h5>
            <p className='card-text'>
              Ben was a pizza chef in a former life. He saw an ad for a now defunct coding school on
              YouTube {new Date().getFullYear() - 2015} years ago caught the bug. He has been
              writing code every day since. When Ben isn&apos;t in front of a screen he enjoys
              cycling and rock climbing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Author
