import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function createContact(data) {
  try {
    const res = await Axios({
      method: 'POST',
      url: `${SERVER_URL}/contacts`,
      data,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default createContact
