import { GA_TRACKING_ID } from '@/lib/constants'

export default function gtagPageview(url) {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
