import { useRef, useState, useEffect } from 'react'
import Downshift from 'downshift'
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import { useAppDispatch } from '@/lib/context'
import { setSearchTerm } from '@/lib/context/actions'
import { gtagEvent } from '@/lib/utils'

import DropDown from './DropDown'

function Search() {
  const dispatch = useAppDispatch()

  const searchRef = useRef()

  const router = useRouter()

  const [dropDownRight, setDropDownRight] = useState(0)

  useEffect(() => {
    function handleKeyDown({ ctrlKey, keyCode }) {
      if (ctrlKey && keyCode === 191) {
        searchRef.current.focus()
      }
    }

    function handleDropDownPosition() {
      setDropDownRight(
        window.innerWidth > 1320
          ? window.innerWidth - searchRef.current.getBoundingClientRect().x - 600
          : 0
      )
    }

    handleDropDownPosition()

    window.addEventListener('resize', handleDropDownPosition)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', handleDropDownPosition)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function onChange(item, helpers) {
    gtagEvent('search', 'blog', item.title)
    helpers.setState({ inputValue: '' })
    router.push(`/blog/${item.slug}`)
  }

  return (
    <Downshift
      id='downshift-search'
      onChange={onChange}
      itemToString={(item) => (item ? item.title : '')}
    >
      {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, closeMenu }) => (
        <div>
          <Form>
            <FormControl
              ref={searchRef}
              type='search'
              placeholder='Search'
              spellCheck={false}
              className='mr-sm-2'
              {...getInputProps({
                onChange: (e) => {
                  e.persist()
                  setSearchTerm(dispatch, e.target.value)
                },
                onKeyDown: (e) => {
                  if (e.key === 'Enter') {
                    e.nativeEvent.preventDownshiftDefault = true
                    closeMenu()
                  }
                },
              })}
            />
          </Form>
          {isOpen && (
            <DropDown
              dropDownRight={dropDownRight}
              inputValue={inputValue}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
            />
          )}
        </div>
      )}
    </Downshift>
  )
}

export default Search
