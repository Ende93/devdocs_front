defaultUrl = null
currentSlug = null

imageCache = {}
urlCache = {}

withImage = (url, action) ->
  if !url
    return

  if imageCache[url]
    action(imageCache[url])
  else
    img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () =>
      imageCache[url] = img
      action(img)

window.setFaviconForDoc = (doc) ->
  return if currentSlug == doc.slug

  favicon = $('link[rel="icon"]')

  if defaultUrl == null
    defaultUrl = favicon.href

  if urlCache[doc.slug]
    favicon.href = urlCache[doc.slug]
    currentSlug = doc.slug
    return

  iconEl = $("._icon-#{doc.slug.split('~')[0]} img")
  return if iconEl == null

  return if iconEl.src == undefined

  bgUrl = iconEl.src
  sourceSize = iconEl.width

  withImage(bgUrl, (docImg) ->
    withImage(defaultUrl, (defaultImg) ->
      size = defaultImg.width

      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')

      canvas.width = size
      canvas.height = size
      ctx.drawImage(defaultImg, 0, 0)

      docIconPercentage = 65
      destinationCoords = size / 100 * (100 - docIconPercentage)
      destinationSize = size / 100 * docIconPercentage

      ctx.drawImage(docImg, destinationCoords, destinationCoords, destinationSize, destinationSize)

      try
        urlCache[doc.slug] = canvas.toDataURL()
        favicon.href = urlCache[doc.slug]

        currentSlug = doc.slug
      catch error
        Raven.captureException error, { level: 'info' }
        @resetFavicon()
    )
  )

window.resetFavicon = () ->
  if defaultUrl != null and currentSlug != null
    $('link[rel="icon"]').href = defaultUrl
    currentSlug = null
