type CreateNewsBody = {
  slug?: string
  category?: string
  titleEn?: string
  titleZh?: string
  summaryEn?: string
  summaryZh?: string
  contentEn?: string
  contentZh?: string
  coverUrl?: string | null
  isPublished?: boolean
  publishedAt?: string
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const body = await readBody<CreateNewsBody>(event)

  const titleEn = body.titleEn?.trim() || ''
  const titleZh = body.titleZh?.trim() || ''
  if (!titleEn || !titleZh) {
    throw createError({ statusCode: 400, statusMessage: 'titleEn and titleZh are required' })
  }

  const category = (body.category?.trim() || 'company').toLowerCase()
  if (!isNewsCategory(category)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid category' })
  }

  const slug = body.slug?.trim() || slugify(titleEn)
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const existing = await db.prepare('SELECT id FROM news WHERE slug = ?').bind(slug).first()
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
  }

  const isPublished = body.isPublished === true ? 1 : 0
  const publishedAt = body.publishedAt?.trim() || new Date().toISOString().slice(0, 19).replace('T', ' ')
  const contentEn = sanitizeNewsHtml(body.contentEn || '')
  const contentZh = sanitizeNewsHtml(body.contentZh || '')
  const coverUrl = body.coverUrl?.trim() || null

  const inserted = await db
    .prepare(
      `INSERT INTO news (
        slug, category, title_en, title_zh, summary_en, summary_zh, content_en, content_zh,
        cover_url, is_published, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id`
    )
    .bind(
      slug,
      category,
      titleEn,
      titleZh,
      body.summaryEn?.trim() || '',
      body.summaryZh?.trim() || '',
      contentEn,
      contentZh,
      coverUrl,
      isPublished,
      publishedAt
    )
    .first<{ id: number }>()

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create news' })
  }

  const row = await db.prepare('SELECT * FROM news WHERE id = ?').bind(inserted.id).first<NewsRow>()
  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load created news' })
  }

  return mapNews(row)
})
