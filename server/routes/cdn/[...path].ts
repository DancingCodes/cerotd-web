export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path')
  if (!pathParam) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const key = Array.isArray(pathParam) ? pathParam.join('/') : String(pathParam)
  if (!key || key.includes('..')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const bucket = useMediaBucket(event)
  const object = await bucket.get(key)
  if (!object) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const contentType = object.httpMetadata?.contentType || 'application/octet-stream'
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', object.httpMetadata?.cacheControl || 'public, max-age=31536000, immutable')
  setHeader(event, 'ETag', object.httpEtag)

  return object.body
})
