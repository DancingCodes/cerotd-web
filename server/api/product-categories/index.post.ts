type CreateCategoryBody = {
  slug?: string
  nameEn?: string
  nameZh?: string
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

  const allocated = await allocateUniqueSlug(db, 'products_categories', nameEn, 'category')
  const slug = allocated.slug

  const sortOrder = Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0
  const isPublished = body.isPublished === false ? 0 : 1

  const inserted = await db
    .prepare(
      `INSERT INTO products_categories (slug, name_en, name_zh, desc_en, desc_zh, cover_url, sort_order, is_published)
       VALUES (?, ?, ?, '', '', NULL, ?, ?)
       RETURNING *`
    )
    .bind(slug, nameEn, nameZh, sortOrder, isPublished)
    .first<CategoryRow>()

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create category' })
  }

  let row = inserted
  if (allocated.usedFallback) {
    await finalizeFallbackSlug(db, 'products_categories', inserted.id, true, 'category')
    row = (await db.prepare('SELECT * FROM products_categories WHERE id = ?').bind(inserted.id).first<CategoryRow>()) || inserted
  }

  setResponseStatus(event, 201)
  return mapCategory(row)
})
