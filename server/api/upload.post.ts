export default defineEventHandler(async (event) => {
  assertAdmin(event)

  const form = await readMultipartFormData(event)
  if (!form?.length) {
    throw createError({ statusCode: 400, statusMessage: 'file is required' })
  }

  const filePart = form.find((part) => part.name === 'file' && part.data)
  const folderPart = form.find((part) => part.name === 'folder')
  if (!filePart?.data?.length) {
    throw createError({ statusCode: 400, statusMessage: 'file is required' })
  }

  const contentType = filePart.type || 'application/octet-stream'
  assertImageType(contentType)

  // 8MB limit
  if (filePart.data.byteLength > 8 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'file too large (max 8MB)' })
  }

  const folder = String(folderPart?.data ? new TextDecoder().decode(folderPart.data) : 'uploads')
  const key = buildObjectKey(folder, contentType)
  const bucket = useMediaBucket(event)

  await bucket.put(key, filePart.data, {
    httpMetadata: {
      contentType,
      cacheControl: 'public, max-age=31536000, immutable'
    }
  })

  return {
    key,
    url: publicMediaUrl(event, key),
    contentType,
    size: filePart.data.byteLength
  }
})
