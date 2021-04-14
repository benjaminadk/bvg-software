import Axios from 'axios'

import { SERVER_URL } from '@/lib/constants'

async function getBlogPostSlugs() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts/slugs`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPostSlugs
