'use strict'

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
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

  async slugs(ctx) {
    const knex = strapi.connections.default
    const result = await knex('blog_posts').select('slug')
    return result
  },
}
