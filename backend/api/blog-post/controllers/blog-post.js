'use strict'

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  // Fetch blog posts
  // Alter image url to use with Cloudinary and Image component
  async find(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services['blog-post'].search(ctx.query)
    } else {
      entities = await strapi.services['blog-post'].find(ctx.query)
    }

    let newEntities = entities.map((entity) =>
      Object.assign(
        entity,
        {
          image: entity.image
            ? Object.assign(
                entity.image,
                {
                  url: entity.image.url.replace(
                    'https://res.cloudinary.com/bvgsoftware/image/upload/',
                    ''
                  ),
                },
                {}
              )
            : null,
        },
        {}
      )
    )

    return newEntities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models['blog-post'] })
    )
  },

  // Fetch all slugs
  async slugs(ctx) {
    const knex = strapi.connections.default
    const result = await knex('blog_posts').select('slug')
    return result
  },

  // Fetch all tags
  async tags(ctx) {
    const knex = strapi.connections.default
    const result = await knex('components_blog_tags').distinct('name')
    return result
  },
}
