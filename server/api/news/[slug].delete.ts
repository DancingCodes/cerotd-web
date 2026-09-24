export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db.prepare('SELECT id FROM news WHERE slug = ?').bind(slug).first()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  await db.prepare('DELETE FROM news WHERE slug = ?').bind(slug).run()
  return { ok: true }
})
