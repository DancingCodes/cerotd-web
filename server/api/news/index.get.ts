export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  const category = typeof query.category === 'string' ? query.category.trim() : ''
  const q = typeof query.q === 'string' ? query.q.trim() : ''
  const status = String(query.status || 'all').trim().toLowerCase()
  const paging = parsePagination(query)

  if (includeUnpublished) {
    assertAdmin(event)
  }

  const where: string[] = []
  const binds: Array<string | number> = []

  if (!includeUnpublished) {
    where.push('is_published = 1')
  } else if (status === 'published') {
    where.push('is_published = 1')
  } else if (status === 'draft') {
    where.push('is_published = 0')
  }

  if (category) {
    const found = await findNewsCategory(db, category, { publishedOnly: !includeUnpublished })
    if (!found) {
      throw createError({ statusCode: 400, statusMessage: 'invalid category' })
    }
    where.push('category = ?')
    binds.push(category)
  }

  if (q) {
    where.push('(title_en LIKE ? OR title_zh LIKE ? OR slug LIKE ?)')
    const like = '%' + q + '%'
    binds.push(like, like, like)
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const orderSql = 'ORDER BY published_at DESC, id DESC'

  if (!paging.enabled) {
    const result = await db
      .prepare(
        `SELECT *
         FROM news
         ${whereSql}
         ${orderSql}`
      )
      .bind(...binds)
      .all<NewsRow>()
    return {
      items: (result.results || []).map(mapNews)
    }
  }

  const countRow = await db
    .prepare(`SELECT COUNT(*) AS count FROM news ${whereSql}`)
    .bind(...binds)
    .first<{ count: number }>()
  const total = Number(countRow?.count || 0)

  const result = await db
    .prepare(
      `SELECT *
       FROM news
       ${whereSql}
       ${orderSql}
       LIMIT ? OFFSET ?`
    )
    .bind(...binds, paging.pageSize, paging.offset)
    .all<NewsRow>()

  return {
    items: (result.results || []).map(mapNews),
    total,
    page: paging.page,
    pageSize: paging.pageSize
  }
})
