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

  const slug = (body.slug?.trim() || slugify(nameEn)).toLowerCase()
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const existing = await db.prepare('SELECT id FROM news_categories WHERE slug = ?').bind(slug).first()
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
  }

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

  setResponseStatus(event, 201)
  return mapNewsCategory(inserted)
})
