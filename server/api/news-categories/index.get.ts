export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  const paging = parsePagination(query)

  if (includeUnpublished) {
    assertAdmin(event)
  }

  const whereSql = includeUnpublished ? '' : 'WHERE is_published = 1'
  const orderSql = 'ORDER BY sort_order ASC, id ASC'

  if (!paging.enabled) {
    const sql = `SELECT * FROM news_categories ${whereSql} ${orderSql}`
    const result = await db.prepare(sql).all<NewsCategoryRow>()
    return {
      items: (result.results || []).map(mapNewsCategory)
    }
  }

  const countRow = await db
    .prepare(`SELECT COUNT(*) AS count FROM news_categories ${whereSql}`)
    .first<{ count: number }>()
  const total = Number(countRow?.count || 0)

  const result = await db
    .prepare(
      `SELECT * FROM news_categories
       ${whereSql}
       ${orderSql}
       LIMIT ? OFFSET ?`
    )
    .bind(paging.pageSize, paging.offset)
    .all<NewsCategoryRow>()

  return {
    items: (result.results || []).map(mapNewsCategory),
    total,
    page: paging.page,
    pageSize: paging.pageSize
  }
})
