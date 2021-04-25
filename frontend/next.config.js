function redirects() {
  return [
    {
      source: '/posts/react-markdown-blog-read-time-feature',
      destination: '/blog/read-time-feature-for-react-markdown-blog/',
      permanent: true,
    },
    {
      source: '/posts/wordpress-form-to-email-and-google-sheet',
      destination: '/blog/email-wordpress-form-and-save-to-google-sheet/',
      permanent: true,
    },
    {
      source: '/posts/react-form-validation-with-formik-graphql-yup',
      destination: '/blog/react-form-validation-with-formik-graphql-yup/',
      permanent: true,
    },
    {
      source: '/posts/how-to-build-a-command-line-application',
      destination: '/blog/how-to-build-a-command-line-application-with-node/',
      permanent: true,
    },
    {
      source: '/posts/how-to-build-a-color-picker',
      destination: '/blog/how-to-build-a-color-picker-with-react/',
      permanent: true,
    },
    {
      source: '/posts/minesweeper',
      destination: '/blog/minesweeper/',
      permanent: true,
    },
    {
      source: '/posts/high-school-clock',
      destination: '/blog/high-school-clock/',
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
