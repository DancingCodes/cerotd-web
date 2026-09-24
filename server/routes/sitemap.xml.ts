const staticPaths = ['/', '/about', '/products', '/news', '/services', '/advantages', '/contact']

export default defineEventHandler(async (event) => {
  const siteUrl = getSiteUrl(event)
  const urls: Array<{ loc: string; lastmod?: string }> = staticPaths.map((path) => ({
    loc: `${siteUrl}${path === '/' ? '' : path}`
  }))

  try {
    const db = useDB(event)
    const products = await db
      .prepare(
        `SELECT slug, updated_at
         FROM products
         WHERE is_published = 1
         ORDER BY sort_order ASC, id ASC`
      )
      .all<{ slug: string; updated_at: string }>()

    for (const row of products.results || []) {
      urls.push({
        loc: `${siteUrl}/products/${row.slug}`,
        lastmod: row.updated_at?.slice(0, 10)
      })
    }

    const news = await db
      .prepare(
        `SELECT slug, updated_at, published_at
         FROM news
         WHERE is_published = 1
         ORDER BY published_at DESC, id DESC`
      )
      .all<{ slug: string; updated_at: string; published_at: string }>()

    for (const row of news.results || []) {
      urls.push({
        loc: `${siteUrl}/news/${row.slug}`,
        lastmod: (row.updated_at || row.published_at)?.slice(0, 10)
      })
    }
  } catch {
    // Keep static urls if D1 is unavailable.
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((item) => {
    const lastmod = item.lastmod ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : ''
    return `  <url>\n    <loc>${escapeXml(item.loc)}</loc>${lastmod}\n  </url>`
  })
  .join('\n')}
</urlset>
`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=1800')
  return body
})
