export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db.prepare('SELECT id FROM products_categories WHERE slug = ?').bind(slug).first<{ id: number }>()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  const linked = await db
    .prepare('SELECT id FROM products WHERE category_id = ? LIMIT 1')
    .bind(current.id)
    .first()
  if (linked) {
    throw createError({ statusCode: 409, statusMessage: 'Category has products. Delete or move them first.' })
  }

  await db.prepare('DELETE FROM products_categories WHERE slug = ?').bind(slug).run()
  return { ok: true }
})
