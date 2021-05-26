import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getBlogPostTags() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts/tags`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPostTags
