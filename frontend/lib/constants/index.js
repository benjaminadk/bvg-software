import MAIN_MENU_ITEMS from './main-menu-items'
import SOCIAL_MEDIA_ITEMS from './social-media-items'
import BREADCRUMB_MAP from './breadcrumb-map'

const GA_TRACKING_ID = 'UA-143670697-9'
const FACEBOOK_APP_ID = ''
const MONTH = 60 * 60 * 24 * 30
const SITE_NAME = 'Benjamin Brooke Web Development'

const CLIENT_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bvgsoftware.com'

const SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.bvgsoftware.com'

const CLOUDINARY_URL = 'https://res.cloudinary.com/bvgsoftware/image/upload/'

export {
  BREADCRUMB_MAP,
  CLIENT_URL,
  CLOUDINARY_URL,
  FACEBOOK_APP_ID,
  GA_TRACKING_ID,
  MAIN_MENU_ITEMS,
  MONTH,
  SERVER_URL,
  SITE_NAME,
  SOCIAL_MEDIA_ITEMS,
}
