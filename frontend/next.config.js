/* eslint-disable no-undef */
const redirects = require('./config/redirects')

module.exports = () => {
  return {
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      domains: ['localhost', 'bvgsoftware.com', 'api.bvgsoftware.com'],
      path: '/_next/image',
      loader: 'default',
    },
    redirects,
    trailingSlash: true,
  }
}
