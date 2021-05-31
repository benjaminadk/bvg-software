import { useState, useEffect } from 'react'
import Image from 'next/image'
import cn from 'classnames'

function SearchHighlight({ active, index, inputValue, title }) {
  if (active) {
    return (
      <div className='result-text'>
        {title.slice(0, index)}
        <span className='search-highlight'>{title.substr(index, inputValue.length)}</span>
        {title.slice(index + inputValue.length, title.length)}
      </div>
    )
  } else {
    return <div className='result-text'>{title}</div>
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
        active={inputValue.length > 2 && highlightIndex >= 0}
        index={highlightIndex}
        inputValue={inputValue}
        title={item.title}
      />
    </div>
  )
}

export default DropDownItem
