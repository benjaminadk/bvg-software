import Axios from 'axios'

import { SERVER_URL } from '../constants'

export default async function googleAuthentication(access_token) {
  try {
    const res = await Axios.get(`${SERVER_URL}/auth/google/callback?access_token=${access_token}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
