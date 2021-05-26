import Axios from 'axios'
import { stringify } from 'qs'

import { SERVER_URL } from '../constants'

async function getBlogPosts(_start = 0, _limit = 12, _where = {}, _sort = 'published_on:DESC') {
  try {
    const query = stringify({ _start, _limit, _where, _sort })
    const res1 = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts?${query}`,
    })
    const res2 = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts/count?${query}`,
    })
    return {
      posts: res1.data,
      totalPosts: res2.data,
    }
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPosts
