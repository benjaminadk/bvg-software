import React, { useState, useEffect } from 'react'
import cn from 'classnames'

function Tags({ blogPosts, selectedTags, onTagClick }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    let tmp = []
    for (let post of blogPosts) {
      for (let tag of post.tags) {
        if (!tmp.find((el) => el.name === tag.name)) {
          tmp.push({ ...tag, count: 1 })
        } else {
          tmp.find((el) => el.name === tag.name)['count'] += 1
        }
      }
    }
    setTags(tmp.sort((a, b) => (a.name > b.name ? 1 : -1)))
  }, [])

  return (
    <div className='row mb-5'>
      <div className='tags col-md-6 offset-md-3'>
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
