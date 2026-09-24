type CreateNewsCategoryBody = {
  slug?: string
  nameEn?: string
  nameZh?: string
  sortOrder?: number
  isPublished?: boolean
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const body = await readBody<CreateNewsCategoryBody>(event)

  const nameEn = body.nameEn?.trim() || ''
  const nameZh = body.nameZh?.trim() || ''
  if (!nameEn || !nameZh) {
    throw createError({ statusCode: 400, statusMessage: 'nameEn and nameZh are required' })
  }

  const allocated = await allocateUniqueSlug(db, 'news_categories', nameEn, 'news-category')
  const slug = allocated.slug

  const sortOrder = Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0
  const isPublished = body.isPublished === false ? 0 : 1

  const inserted = await db
    .prepare(
      `INSERT INTO news_categories (slug, name_en, name_zh, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?)
       RETURNING *`
    )
    .bind(slug, nameEn, nameZh, sortOrder, isPublished)
    .first<NewsCategoryRow>()

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create news category' })
  }

  let row = inserted
  if (allocated.usedFallback) {
    await finalizeFallbackSlug(db, 'news_categories', inserted.id, true, 'news-category')
    row = (await db.prepare('SELECT * FROM news_categories WHERE id = ?').bind(inserted.id).first<NewsCategoryRow>()) || inserted
  }

  setResponseStatus(event, 201)
  return mapNewsCategory(row)
})
