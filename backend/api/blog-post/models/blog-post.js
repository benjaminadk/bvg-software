'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.content) {
        data.read_time = strapi.services['blog-post'].calculateReadTime(
          data.content
        )
      }
    },
    async beforeUpdate(params, data) {
      if (data.content) {
        data.read_time = strapi.services['blog-post'].calculateReadTime(
          data.content
        )
      }
    },
  },
}
