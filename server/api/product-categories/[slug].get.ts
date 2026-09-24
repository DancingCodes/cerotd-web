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
    ? await db.prepare('SELECT * FROM products_categories WHERE slug = ?').bind(slug).first<CategoryRow>()
    : await db
        .prepare('SELECT * FROM products_categories WHERE slug = ? AND is_published = 1')
        .bind(slug)
        .first<CategoryRow>()

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  return mapCategory(row)
})
