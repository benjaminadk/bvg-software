import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getFAQPage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/faq-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getFAQPage
