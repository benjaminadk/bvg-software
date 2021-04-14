const GA_TRACKING_ID = ''
const FACEBOOK_APP_ID = ''
const MONTH = 60 * 60 * 24 * 30
const SITE_NAME = 'BVG Software Solutions'

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://bvgsoftware.com'

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1337'
    : 'https://api.bvgsoftware.com'

export {
  CLIENT_URL,
  FACEBOOK_APP_ID,
  GA_TRACKING_ID,
  MONTH,
  SERVER_URL,
  SITE_NAME,
}
