import React from 'react'

import Minesweeper from '../visualizations/Minesweeper'
import HighSchoolClock from '../visualizations/HighSchoolClock'
import SimpleBinarySearchTree from '../visualizations/SimpleBinarySearchTree'
import Heading from './Heading'
import Markdown from '../Markdown'
import Author from './Author'

function BlogPost({ blogPost }) {
  if (blogPost) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <Heading post={blogPost} />
            <div>
              {blogPost.slug === 'minesweeper' && <Minesweeper />}
              {blogPost.slug === 'high-school-clock' && <HighSchoolClock />}
              {blogPost.slug === 'simple-binary-search-tree' && <SimpleBinarySearchTree />}
              <Markdown source={blogPost.content} />
            </div>
            <Author />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default BlogPost
