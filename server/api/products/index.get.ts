export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  const categorySlug = typeof query.category === 'string' ? query.category.trim() : ''

  if (includeUnpublished) {
    assertAdmin(event)
  }

  const where: string[] = []
  const binds: Array<string | number> = []

  if (!includeUnpublished) {
    where.push('p.is_published = 1')
  }

  if (categorySlug) {
    where.push('c.slug = ?')
    binds.push(categorySlug)
  }

  const sql = `${productSelectSql}
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY p.sort_order ASC, p.id ASC`

  const result = await db.prepare(sql).bind(...binds).all<ProductRow>()
  return {
    items: (result.results || []).map(mapProduct)
  }
})
