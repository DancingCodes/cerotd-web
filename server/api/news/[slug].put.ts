type UpdateNewsBody = {
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
  const currentSlug = getRouterParam(event, 'slug')
  if (!currentSlug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const current = await db.prepare('SELECT * FROM news WHERE slug = ?').bind(currentSlug).first<NewsRow>()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  const body = await readBody<UpdateNewsBody>(event)
  const nextSlug = body.slug?.trim() || current.slug
  const titleEn = body.titleEn?.trim() ?? current.title_en
  const titleZh = body.titleZh?.trim() ?? current.title_zh
  const summaryEn = body.summaryEn?.trim() ?? current.summary_en
  const summaryZh = body.summaryZh?.trim() ?? current.summary_zh
  const contentEn = body.contentEn === undefined ? current.content_en : sanitizeNewsHtml(body.contentEn)
  const contentZh = body.contentZh === undefined ? current.content_zh : sanitizeNewsHtml(body.contentZh)
  const coverUrl = body.coverUrl === undefined ? current.cover_url : body.coverUrl?.trim() || null
  const publishedAt = body.publishedAt?.trim() || current.published_at
  const isPublished =
    body.isPublished === undefined ? current.is_published : body.isPublished ? 1 : 0

  const categoryRaw = body.category?.trim() || current.category
  const category = categoryRaw.toLowerCase()
  if (!isNewsCategory(category)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid category' })
  }

  if (!nextSlug || !titleEn || !titleZh) {
    throw createError({ statusCode: 400, statusMessage: 'slug, titleEn and titleZh are required' })
  }

  if (nextSlug !== current.slug) {
    const conflict = await db.prepare('SELECT id FROM news WHERE slug = ?').bind(nextSlug).first()
    if (conflict) {
      throw createError({ statusCode: 409, statusMessage: 'slug already exists' })
    }
  }

  await db
    .prepare(
      `UPDATE news
       SET slug = ?, category = ?, title_en = ?, title_zh = ?, summary_en = ?, summary_zh = ?,
           content_en = ?, content_zh = ?, cover_url = ?, is_published = ?, published_at = ?,
           updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      nextSlug,
      category,
      titleEn,
      titleZh,
      summaryEn,
      summaryZh,
      contentEn,
      contentZh,
      coverUrl,
      isPublished,
      publishedAt,
      current.id
    )
    .run()

  const updated = await db.prepare('SELECT * FROM news WHERE id = ?').bind(current.id).first<NewsRow>()
  if (!updated) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update news' })
  }

  return mapNews(updated)
})
