type CreateCategoryBody = {
  slug?: string
  nameEn?: string
  nameZh?: string
  descEn?: string
  descZh?: string
  coverUrl?: string | null
  sortOrder?: number
  isPublished?: boolean
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const body = await readBody<CreateCategoryBody>(event)

  const nameEn = body.nameEn?.trim() || ''
  const nameZh = body.nameZh?.trim() || ''
  if (!nameEn || !nameZh) {
    throw createError({ statusCode: 400, statusMessage: 'nameEn and nameZh are required' })
  }

  const slug = (body.slug?.trim() || slugify(nameEn))
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const existing = await db.prepare('SELECT id FROM categories WHERE slug = ?').bind(slug).first()
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
  }

  const sortOrder = Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0
  const isPublished = body.isPublished === false ? 0 : 1
  const coverUrl = body.coverUrl ?? null
  const descEn = body.descEn?.trim() || ''
  const descZh = body.descZh?.trim() || ''

  const inserted = await db
    .prepare(
      `INSERT INTO categories (slug, name_en, name_zh, desc_en, desc_zh, cover_url, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING *`
    )
    .bind(slug, nameEn, nameZh, descEn, descZh, coverUrl, sortOrder, isPublished)
    .first<CategoryRow>()

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create category' })
  }

  setResponseStatus(event, 201)
  return mapCategory(inserted)
})
