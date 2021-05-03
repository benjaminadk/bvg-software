import React from 'react'
import Link from 'next/link'

import { MAIN_MENU_ITEMS } from '../../lib/constants'

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Benjamin Brooke
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {MAIN_MENU_ITEMS.map((item) => (
              <li key={item.text} className='nav-item'>
                <Link href={item.href}>
                  <a className='nav-link'>{item.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
