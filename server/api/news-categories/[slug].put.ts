type UpdateNewsCategoryBody = {
  slug?: string
  nameEn?: string
  nameZh?: string
  sortOrder?: number
  isPublished?: boolean
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const currentSlug = getRouterParam(event, 'slug')
  if (!currentSlug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db
    .prepare('SELECT * FROM news_categories WHERE slug = ?')
    .bind(currentSlug)
    .first<NewsCategoryRow>()

  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'News category not found' })
  }

  const body = await readBody<UpdateNewsCategoryBody>(event)
  const nextSlug = (body.slug?.trim() || current.slug).toLowerCase()
  const nameEn = body.nameEn?.trim() ?? current.name_en
  const nameZh = body.nameZh?.trim() ?? current.name_zh
  const sortOrder = body.sortOrder === undefined ? current.sort_order : Number(body.sortOrder)
  const isPublished =
    body.isPublished === undefined ? current.is_published : body.isPublished ? 1 : 0

  if (!nextSlug || !nameEn || !nameZh) {
    throw createError({ statusCode: 400, statusMessage: 'slug, nameEn and nameZh are required' })
  }

  if (nextSlug !== current.slug) {
    const conflict = await db.prepare('SELECT id FROM news_categories WHERE slug = ?').bind(nextSlug).first()
    if (conflict) {
      throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
    }
  }

  const updated = await db
    .prepare(
      `UPDATE news_categories
       SET slug = ?, name_en = ?, name_zh = ?, sort_order = ?, is_published = ?, updated_at = datetime('now')
       WHERE id = ?
       RETURNING *`
    )
    .bind(nextSlug, nameEn, nameZh, sortOrder, isPublished, current.id)
    .first<NewsCategoryRow>()

  if (!updated) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update news category' })
  }

  if (nextSlug !== current.slug) {
    await db.prepare('UPDATE news SET category = ? WHERE category = ?').bind(nextSlug, current.slug).run()
  }

  return mapNewsCategory(updated)
})
