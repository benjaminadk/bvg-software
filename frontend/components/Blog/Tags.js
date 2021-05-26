import { useState, useEffect } from 'react'
import cn from 'classnames'

import { getBlogPostTags } from '@/lib/strapi'

function Tags({ selectedTags, onTagClick }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    async function fetchTags() {
      let allTags = await getBlogPostTags()
      setTags(allTags)
    }
    fetchTags()
  }, [])

  return (
    <div id='Tags' className='row mb-5'>
      <div className='tags-wrapper col-md-6 offset-md-3'>
        {[{ name: 'all posts' }, ...tags].map((tag) => (
          <button
            key={tag.name}
            type='button'
            className={cn('tag btn btn-sm ms-2 mb-2', {
              'tag-active': selectedTags.includes(tag.name),
            })}
            onClick={() => onTagClick(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tags
