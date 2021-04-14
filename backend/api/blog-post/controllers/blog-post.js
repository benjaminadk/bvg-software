'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async slugs(ctx) {
    const knex = strapi.connections.default
    const result = await knex('blog_posts').select('slug')
    return result
  },
}
