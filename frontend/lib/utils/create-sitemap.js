const prettier = require('prettier')
const Axios = require('axios')
const { format } = require('date-fns')
const fs = require('fs')
const path = require('path')

const CLIENT_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bvgsoftware.com'
const SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.bvgsoftware.com'
const TODAY = format(new Date(), 'yyyy-MM-dd')

const coreRoutes = ['', 'about', 'blog', 'courses', 'privacy']

async function main() {
  const res = await Axios({
    method: 'GET',
    url: `${SERVER_URL}/blog-posts`,
  })

  const blogRoutes = res.data.map((el) => `blog/${el.slug}`)
  const allRoutes = [...coreRoutes, ...blogRoutes]

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes
          .map((route) => {
            return `
                    <url>
                      <loc>${`${CLIENT_URL}/${route ? route + '/' : ''}`}</loc>
                      <lastmod>${TODAY}</lastmod>
                      <changefreq>daily</changefreq>
		                  <priority>0.9</priority>
                    </url>`
          })
          .join('')}
      </urlset>
  `

  fs.writeFileSync(
    path.join(__dirname, '../../public', 'sitemap.xml'),
    prettier.format(sitemap, { parser: 'html' })
  )

  console.log('new sitemap created')
}

main()
