import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getBlogPosts() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPosts
