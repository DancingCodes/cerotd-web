type CreateProductBody = {
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
  showOnHome?: boolean
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const body = await readBody<CreateProductBody>(event)

  const nameEn = body.nameEn?.trim() || ''
  const nameZh = body.nameZh?.trim() || ''
  const categorySlug = body.categorySlug?.trim() || ''
  if (!nameEn || !nameZh || !categorySlug) {
    throw createError({ statusCode: 400, statusMessage: 'nameEn, nameZh and categorySlug are required' })
  }

  const category = await db
    .prepare('SELECT id FROM products_categories WHERE slug = ?')
    .bind(categorySlug)
    .first<{ id: number }>()
  if (!category) {
    throw createError({ statusCode: 400, statusMessage: 'category not found' })
  }

  const allocated = await allocateUniqueSlug(db, 'products', nameEn, 'product')
  const slug = allocated.slug

  const images = Array.isArray(body.images) ? body.images.map((item) => String(item).trim()).filter(Boolean) : []
  const specsEn = Array.isArray(body.specsEn) ? body.specsEn.map((item) => String(item).trim()).filter(Boolean) : []
  const specsZh = Array.isArray(body.specsZh) ? body.specsZh.map((item) => String(item).trim()).filter(Boolean) : []
  const coverUrl = body.coverUrl ?? images[0] ?? null
  const sortOrder = Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0
  const isPublished = body.isPublished === false ? 0 : 1
  const showOnHome = body.showOnHome === true ? 1 : 0

  const inserted = await db
    .prepare(
      `INSERT INTO products (
        slug, category_id, name_en, name_zh, summary_en, summary_zh, description_en, description_zh,
        cover_url, images_json, specs_en_json, specs_zh_json, sort_order, is_published, show_on_home
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id`
    )
    .bind(
      slug,
      category.id,
      nameEn,
      nameZh,
      body.summaryEn?.trim() || '',
      body.summaryZh?.trim() || '',
      body.descriptionEn?.trim() || '',
      body.descriptionZh?.trim() || '',
      coverUrl,
      JSON.stringify(images),
      JSON.stringify(specsEn),
      JSON.stringify(specsZh),
      sortOrder,
      isPublished,
      showOnHome
    )
    .first<{ id: number }>()

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create product' })
  }

  await finalizeFallbackSlug(db, 'products', inserted.id, allocated.usedFallback, 'product')

  const row = await db
    .prepare(`${productSelectSql} WHERE p.id = ?`)
    .bind(inserted.id)
    .first<ProductRow>()

  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load created product' })
  }

  return mapProduct(row)
})
