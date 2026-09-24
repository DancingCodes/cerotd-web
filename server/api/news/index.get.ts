export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  const category = typeof query.category === 'string' ? query.category.trim() : ''

  if (includeUnpublished) {
    assertAdmin(event)
  }

  const where: string[] = []
  const binds: Array<string | number> = []

  if (!includeUnpublished) {
    where.push('is_published = 1')
  }

  if (category) {
    if (!isNewsCategory(category)) {
      throw createError({ statusCode: 400, statusMessage: 'invalid category' })
    }
    where.push('category = ?')
    binds.push(category)
  }

  const sql = `SELECT *
    FROM news
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY published_at DESC, id DESC`

  const result = await db.prepare(sql).bind(...binds).all<NewsRow>()
  return {
    items: (result.results || []).map(mapNews)
  }
})
