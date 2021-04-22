import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getHomePage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/home-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getHomePage
