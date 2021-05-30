import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getPrivacyPage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/privacy-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getPrivacyPage
