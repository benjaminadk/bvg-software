async function redirects() {
  return [
    {
      source: '/posts/wordpress-form-to-email-and-google-sheet',
      destination: '/blog/email-wordpress-form-and-save-to-google-sheet/',
      permanent: true,
    },
  ]
}

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
