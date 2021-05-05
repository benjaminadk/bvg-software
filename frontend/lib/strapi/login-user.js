import Axios from 'axios'

import { SERVER_URL } from '../constants'

export default async function loginUser({ email, password }) {
  try {
    const res = await Axios({
      method: 'POST',
      url: `${SERVER_URL}/auth/local`,
      data: {
        identifier: email,
        password,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
