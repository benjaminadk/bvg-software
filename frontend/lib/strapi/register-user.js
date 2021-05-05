import Axios from 'axios'

import { SERVER_URL } from '../constants'

export default async function registerUser({ username, email, password }) {
  try {
    const res = await Axios({
      method: 'POST',
      url: `${SERVER_URL}/auth/local/register`,
      data: {
        username,
        email,
        password,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
