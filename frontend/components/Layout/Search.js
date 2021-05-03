import React from 'react'

function Search() {
  return (
    <nav
      id='Search'
      className='navbar navbar-dark bg-secondary position-sticky top-0'
    >
      <div className='container-fluid d-flex justify-content-end'>
        <form>
          <input
            className='form-control'
            type='search'
            placeholder='Search...'
            aria-label='Search'
          />
        </form>
      </div>
    </nav>
  )
}

export default Search
