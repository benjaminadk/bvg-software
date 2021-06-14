module.exports = ({ env }) => ({
  host: env('ADMIN_HOST'),
  port: env.int('ADMIN_PORT'),
  url: env('ADMIN_URL'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
})
