import Axios from 'axios'

import { SERVER_URL } from '../constants'

export default async function getCurrentUser(token) {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
