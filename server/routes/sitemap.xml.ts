import type { ApiResponse } from '../../shared/api'

type SlugItem = { slug: string }
type ListResponse = { items: SlugItem[] }

const staticPaths = ['/', '/products', '/news', '/services', '/advantages', '/about', '/contact']

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[character]!)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  async function publishedSlugs(path: string) {
    const response = await $fetch<ApiResponse<ListResponse>>(`${config.adminApiOrigin}${path}`)
    if (response.code !== 200) throw createError({ statusCode: 500, message: '无法生成网站地图。' })
    return response.data.items.map(item => item.slug)
  }

  const [products, news] = await Promise.all([
    publishedSlugs('/api/products'),
    publishedSlugs('/api/news')
  ])
  const paths = [
    ...staticPaths,
    ...products.map(slug => `/products/${encodeURIComponent(slug)}`),
    ...news.map(slug => `/news/${encodeURIComponent(slug)}`)
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${escapeXml(siteUrl + path)}</loc></url>`).join('\n')}\n</urlset>\n`
})
