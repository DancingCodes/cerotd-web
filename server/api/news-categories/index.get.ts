export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'

  if (includeUnpublished) {
    assertAdmin(event)
  }

  const sql = includeUnpublished
    ? 'SELECT * FROM news_categories ORDER BY sort_order ASC, id ASC'
    : 'SELECT * FROM news_categories WHERE is_published = 1 ORDER BY sort_order ASC, id ASC'

  const result = await db.prepare(sql).all<NewsCategoryRow>()
  return {
    items: (result.results || []).map(mapNewsCategory)
  }
})
