module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: true,
      type: 'redis',
      redisConfig: {
        port: 6379,
        host: '127.0.0.1',
        password: env('REDIS_PASSWORD'),
      },
      max: 1000,
      maxAge: 86400000,
      models: [
        {
          model: 'about-page',
          singleType: true,
        },
        {
          model: 'blog-page',
          singleType: true,
        },
        {
          model: 'courses-page',
          singleType: true,
        },
        {
          model: 'home-page',
          singleType: true,
        },
        {
          model: 'privacy-page',
          singleType: true,
        },
        {
          model: 'blog-posts',
        },
        {
          model: 'courses',
        },
      ],
    },
  },
})
