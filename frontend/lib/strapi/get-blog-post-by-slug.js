import Axios from 'axios'
import qs from 'qs'

import { SERVER_URL } from '../constants'

async function getBlogPostBySlug(slug) {
  try {
    const query = qs.stringify({ _where: { slug } })
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-posts?${query}`,
    })
    console.log(res)
    return res.data[0]
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPostBySlug
