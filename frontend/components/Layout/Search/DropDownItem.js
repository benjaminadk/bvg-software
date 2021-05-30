import { useState, useEffect } from 'react'
import Image from 'next/image'
import cn from 'classnames'

function SearchHighlight({ active, index, inputValue, name }) {
  if (active) {
    return (
      <div className='result-text'>
        {name.slice(0, index)}
        <span className='search-highlight'>{name.substr(index, inputValue.length)}</span>
        {name.slice(index + inputValue.length, name.length)}
      </div>
    )
  } else {
    return <div className='result-text'>{name}</div>
  }
}

function DropDownItem({ item, index, inputValue, highlight, getItemProps }) {
  const [highlightIndex, setHighlightIndex] = useState()

  useEffect(() => {
    setHighlightIndex(item.title.toLowerCase().indexOf(inputValue.toLowerCase()))
  }, [item, inputValue])

  return (
    <div
      className={cn('DropDownItem d-flex align-items-center', { highlight })}
      {...getItemProps({ item, index })}
    >
      <div className='thumbnail'>
        <Image src={item.image.url} alt={item.title} width={64} height={36} />
      </div>
      <SearchHighlight
        active={inputValue.length > 2 && highlightIndex && highlightIndex >= 0}
        index={highlightIndex}
        inputValue={inputValue}
        name={item.title}
      />
    </div>
  )
}

export default DropDownItem
