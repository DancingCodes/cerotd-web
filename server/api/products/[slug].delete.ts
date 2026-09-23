export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db.prepare('SELECT id FROM products WHERE slug = ?').bind(slug).first()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  await db.prepare('DELETE FROM products WHERE slug = ?').bind(slug).run()
  return { ok: true }
})
