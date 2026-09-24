type UpdateCategoryBody = {
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
  const currentSlug = getRouterParam(event, 'slug')
  if (!currentSlug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db
    .prepare('SELECT * FROM products_categories WHERE slug = ?')
    .bind(currentSlug)
    .first<CategoryRow>()

  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  const body = await readBody<UpdateCategoryBody>(event)
  const nextSlug = current.slug
  const nameEn = body.nameEn?.trim() ?? current.name_en
  const nameZh = body.nameZh?.trim() ?? current.name_zh
  const descEn = body.descEn?.trim() ?? current.desc_en
  const descZh = body.descZh?.trim() ?? current.desc_zh
  const coverUrl = body.coverUrl === undefined ? current.cover_url : body.coverUrl
  const sortOrder = body.sortOrder === undefined ? current.sort_order : Number(body.sortOrder)
  const isPublished =
    body.isPublished === undefined ? current.is_published : body.isPublished ? 1 : 0

  if (!nextSlug || !nameEn || !nameZh) {
    throw createError({ statusCode: 400, statusMessage: 'slug, nameEn and nameZh are required' })
  }

  const updated = await db
    .prepare(
      `UPDATE products_categories
       SET slug = ?, name_en = ?, name_zh = ?, desc_en = ?, desc_zh = ?, cover_url = ?, sort_order = ?, is_published = ?, updated_at = datetime('now')
       WHERE id = ?
       RETURNING *`
    )
    .bind(nextSlug, nameEn, nameZh, descEn, descZh, coverUrl, sortOrder, isPublished, current.id)
    .first<CategoryRow>()

  if (!updated) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update category' })
  }

  return mapCategory(updated)
})
