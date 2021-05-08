import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

function Search() {
  const searchRef = useRef()

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    function handleKeyDown({ ctrlKey, keyCode }) {
      if (ctrlKey && keyCode === 191) {
        searchRef.current.focus()
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Navbar id='Search' bg='gray-300' variant='light' sticky='top'>
      <Container fluid='xxl' className='justify-content-center justify-content-lg-end'>
        <Form>
          <FormControl ref={searchRef} type='search' placeholder='Search' className='mr-sm-2' />
        </Form>
      </Container>
    </Navbar>
  )
}

export default Search
