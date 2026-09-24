type InquiryPatchBody = {
  isRead?: boolean
}

export default defineEventHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'id is required' })
  }

  const body = await readBody<InquiryPatchBody>(event)
  if (typeof body?.isRead !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: 'isRead is required' })
  }

  const current = await db.prepare('SELECT id FROM inquiries WHERE id = ?').bind(id).first()
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Inquiry not found' })
  }

  await db
    .prepare('UPDATE inquiries SET is_read = ? WHERE id = ?')
    .bind(body.isRead ? 1 : 0, id)
    .run()

  return { ok: true, id, isRead: body.isRead }
})
