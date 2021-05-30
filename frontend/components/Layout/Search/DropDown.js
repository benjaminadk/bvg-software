import { useAppState } from '@/lib/context'

import DropDownItem from './DropDownItem'

function DropDown({ dropDownRight, inputValue, highlightedIndex, getItemProps }) {
  const { searchResults } = useAppState()

  return (
    <div className='DropDown' style={{ right: dropDownRight + 'px' }}>
      {searchResults.slice(0, 8).map((item, i) => (
        <DropDownItem
          key={item.id}
          item={item}
          index={i}
          inputValue={inputValue}
          highlight={i === highlightedIndex}
          getItemProps={getItemProps}
        />
      ))}
    </div>
  )
}

export default DropDown
