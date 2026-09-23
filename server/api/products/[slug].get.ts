export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  if (includeUnpublished) {
    assertAdmin(event)
  }

  const row = includeUnpublished
    ? await db.prepare(`${productSelectSql} WHERE p.slug = ?`).bind(slug).first<ProductRow>()
    : await db
        .prepare(`${productSelectSql} WHERE p.slug = ? AND p.is_published = 1`)
        .bind(slug)
        .first<ProductRow>()

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return mapProduct(row)
})
