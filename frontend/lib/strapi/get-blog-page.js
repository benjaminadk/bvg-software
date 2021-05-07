import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getBlogPage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/blog-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getBlogPage
