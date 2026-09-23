type UpdateProductBody = {
  slug?: string
  categorySlug?: string
  nameEn?: string
  nameZh?: string
  summaryEn?: string
  summaryZh?: string
  descriptionEn?: string
  descriptionZh?: string
  coverUrl?: string | null
  images?: string[]
  specsEn?: string[]
  specsZh?: string[]
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
    .prepare(`${productSelectSql} WHERE p.slug = ?`)
    .bind(currentSlug)
    .first<ProductRow>()

  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const body = await readBody<UpdateProductBody>(event)
  const nextSlug = body.slug?.trim() || current.slug
  const nameEn = body.nameEn?.trim() ?? current.name_en
  const nameZh = body.nameZh?.trim() ?? current.name_zh
  const summaryEn = body.summaryEn?.trim() ?? current.summary_en
  const summaryZh = body.summaryZh?.trim() ?? current.summary_zh
  const descriptionEn = body.descriptionEn?.trim() ?? current.description_en
  const descriptionZh = body.descriptionZh?.trim() ?? current.description_zh
  const sortOrder = body.sortOrder === undefined ? current.sort_order : Number(body.sortOrder)
  const isPublished =
    body.isPublished === undefined ? current.is_published : body.isPublished ? 1 : 0

  let categoryId = current.category_id
  if (body.categorySlug?.trim()) {
    const category = await db
      .prepare('SELECT id FROM categories WHERE slug = ?')
      .bind(body.categorySlug.trim())
      .first<{ id: number }>()
    if (!category) {
      throw createError({ statusCode: 400, statusMessage: 'category not found' })
    }
    categoryId = category.id
  }

  const images =
    body.images === undefined
      ? parseJsonArray(current.images_json)
      : body.images.map((item) => String(item).trim()).filter(Boolean)
  const specsEn =
    body.specsEn === undefined
      ? parseJsonArray(current.specs_en_json)
      : body.specsEn.map((item) => String(item).trim()).filter(Boolean)
  const specsZh =
    body.specsZh === undefined
      ? parseJsonArray(current.specs_zh_json)
      : body.specsZh.map((item) => String(item).trim()).filter(Boolean)
  const coverUrl =
    body.coverUrl === undefined ? current.cover_url || images[0] || null : body.coverUrl || images[0] || null

  if (!nextSlug || !nameEn || !nameZh) {
    throw createError({ statusCode: 400, statusMessage: 'slug, nameEn and nameZh are required' })
  }

  if (nextSlug !== current.slug) {
    const conflict = await db.prepare('SELECT id FROM products WHERE slug = ?').bind(nextSlug).first()
    if (conflict) {
      throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
    }
  }

  await db
    .prepare(
      `UPDATE products
       SET slug = ?, category_id = ?, name_en = ?, name_zh = ?, summary_en = ?, summary_zh = ?,
           description_en = ?, description_zh = ?, cover_url = ?, images_json = ?, specs_en_json = ?,
           specs_zh_json = ?, sort_order = ?, is_published = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      nextSlug,
      categoryId,
      nameEn,
      nameZh,
      summaryEn,
      summaryZh,
      descriptionEn,
      descriptionZh,
      coverUrl,
      JSON.stringify(images),
      JSON.stringify(specsEn),
      JSON.stringify(specsZh),
      sortOrder,
      isPublished,
      current.id
    )
    .run()

  const updated = await db
    .prepare(`${productSelectSql} WHERE p.id = ?`)
    .bind(current.id)
    .first<ProductRow>()

  if (!updated) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update product' })
  }

  return mapProduct(updated)
})
