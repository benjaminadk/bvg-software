import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getAboutPage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/about-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getAboutPage
