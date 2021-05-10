/* eslint-disable no-undef */
const redirects = require('./config/redirects')
const images = require('./config/images')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images,
  redirects,
  trailingSlash: true,
})
