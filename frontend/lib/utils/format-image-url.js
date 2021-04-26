import { SERVER_URL } from '../constants'

export default function formatImageUrl(url) {
  return `${SERVER_URL}${url}`
}
