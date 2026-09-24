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
    const sql = `SELECT * FROM products_categories ${whereSql} ${orderSql}`
    const result = await db.prepare(sql).all<CategoryRow>()
    return {
      items: (result.results || []).map(mapCategory)
    }
  }

  const countRow = await db
    .prepare(`SELECT COUNT(*) AS count FROM products_categories ${whereSql}`)
    .first<{ count: number }>()
  const total = Number(countRow?.count || 0)

  const result = await db
    .prepare(
      `SELECT * FROM products_categories
       ${whereSql}
       ${orderSql}
       LIMIT ? OFFSET ?`
    )
    .bind(paging.pageSize, paging.offset)
    .all<CategoryRow>()

  return {
    items: (result.results || []).map(mapCategory),
    total,
    page: paging.page,
    pageSize: paging.pageSize
  }
})
