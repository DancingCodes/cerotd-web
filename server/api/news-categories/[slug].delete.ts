export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db
    .prepare('SELECT id FROM news_categories WHERE slug = ?')
    .bind(slug)
    .first<{ id: number }>()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'News category not found' })
  }

  const linked = await db.prepare('SELECT id FROM news WHERE category = ? LIMIT 1').bind(slug).first()
  if (linked) {
    throw createError({
      statusCode: 409,
      statusMessage: 'News category has articles. Delete or move them first.'
    })
  }

  await db.prepare('DELETE FROM news_categories WHERE slug = ?').bind(slug).run()
  return { ok: true }
})
