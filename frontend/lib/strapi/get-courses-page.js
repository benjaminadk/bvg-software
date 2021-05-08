import Axios from 'axios'

import { SERVER_URL } from '../constants'

async function getCoursesPage() {
  try {
    const res = await Axios({
      method: 'GET',
      url: `${SERVER_URL}/courses-page`,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default getCoursesPage
