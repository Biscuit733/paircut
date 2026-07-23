import type {
  CouplePosterTemplate,
  TemplateImageElement,
  TemplateShapeElement,
  TemplateTextElement,
} from '../types'
import { applyRoundedClip, getCoverRect } from '../../../utils/canvas'
import { loadImageElement } from '../../../utils/image'
import { sortedElements } from './scaleTemplate'

export type TemplateThumbnailSources = {
  original: string | null
  avatarACircle: string | null
  avatarASquare: string | null
  avatarBCircle: string | null
  avatarBSquare: string | null
}

export async function makeTemplateThumbnail(template: CouplePosterTemplate, sources: TemplateThumbnailSources) {
  const width = 320
  const height = Math.max(180, Math.round(width * (template.canvasHeight / template.canvasWidth)))
  const scaleX = width / template.canvasWidth
  const scaleY = height / template.canvasHeight
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return ''

  context.fillStyle = template.backgroundColor
  context.fillRect(0, 0, width, height)
  await document.fonts.ready

  const imageCache = new Map<string, HTMLImageElement>()
  for (const element of sortedElements(template.elements)) {
    if (element.visible === false) continue
    if (element.type === 'shape') drawShape(context, element, scaleX, scaleY)
    if (element.type === 'text') drawText(context, element, scaleX, scaleY)
    if (element.type === 'image') await drawImage(context, element, sources, imageCache, scaleX, scaleY)
  }
  return canvas.toDataURL('image/png')
}

function drawShape(context: CanvasRenderingContext2D, element: TemplateShapeElement, scaleX: number, scaleY: number) {
  const x = element.x * scaleX
  const y = element.y * scaleY
  const width = element.width * scaleX
  const height = element.height * scaleY
  const scale = Math.max(scaleX, scaleY)
  context.save()
  context.globalAlpha = element.opacity ?? 1
  context.fillStyle = element.fill
  context.strokeStyle = element.stroke ?? element.fill
  context.lineWidth = (element.strokeWidth ?? 0) * scale
  context.shadowColor = element.shadowColor ?? 'transparent'
  context.shadowBlur = (element.shadowBlur ?? 0) * scale
  context.shadowOffsetX = (element.shadowOffsetX ?? 0) * scaleX
  context.shadowOffsetY = (element.shadowOffsetY ?? 0) * scaleY
  if (element.shape === 'circle') {
    context.beginPath()
    context.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2)
    context.fill()
    if (element.strokeWidth) context.stroke()
  } else if (element.shape === 'line') {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + width, y + height)
    context.stroke()
  } else {
    applyRoundedClip(context, x, y, width, height, (element.borderRadius ?? 0) * scale)
    context.fill()
    if (element.strokeWidth) context.stroke()
  }
  context.restore()
}

function drawText(context: CanvasRenderingContext2D, element: TemplateTextElement, scaleX: number, scaleY: number) {
  const x = element.x * scaleX
  const y = element.y * scaleY
  const width = element.width * scaleX
  const fontSize = element.fontSize * scaleY
  context.save()
  context.fillStyle = element.color
  context.strokeStyle = element.strokeColor ?? element.color
  context.lineWidth = (element.strokeWidth ?? 0) * Math.max(scaleX, scaleY)
  context.lineJoin = 'round'
  context.shadowColor = element.shadowColor ?? 'transparent'
  context.shadowBlur = (element.shadowBlur ?? 0) * Math.max(scaleX, scaleY)
  context.shadowOffsetX = (element.shadowOffsetX ?? 0) * scaleX
  context.shadowOffsetY = (element.shadowOffsetY ?? 0) * scaleY
  context.textAlign = element.textAlign
  context.textBaseline = 'top'
  context.font = `${element.fontWeight} ${fontSize}px ${element.fontFamily}`
  const anchorX = element.textAlign === 'center' ? x + width / 2 : element.textAlign === 'right' ? x + width : x
  const text = element.text.slice(0, 36)
  if (element.strokeWidth) context.strokeText(text, anchorX, y)
  context.fillText(text, anchorX, y)
  context.restore()
}

async function drawImage(
  context: CanvasRenderingContext2D,
  element: TemplateImageElement,
  sources: TemplateThumbnailSources,
  imageCache: Map<string, HTMLImageElement>,
  scaleX: number,
  scaleY: number,
) {
  const url = resolveImageUrl(element, sources)
  const image = url ? await loadCachedImage(url, imageCache) : null
  const x = element.x * scaleX
  const y = element.y * scaleY
  const width = element.width * scaleX
  const height = element.height * scaleY
  const scale = Math.max(scaleX, scaleY)
  context.save()
  drawImageShadow(context, element, x, y, width, height, scale, scaleX, scaleY)
  buildImagePath(context, element, x, y, width, height, scale)
  context.clip()
  if (image) {
    const adjustment = element.adjustment ?? { scale: 1, offsetX: 0, offsetY: 0, rotation: 0, flipX: false, flipY: false }
    const ratio = image.naturalWidth / image.naturalHeight
    const rect = element.objectFit === 'contain' ? getContainRect(ratio, width, height) : getCoverRect(ratio, width, height)
    context.translate(x + width / 2, y + height / 2)
    context.rotate((((element.rotation ?? 0) + adjustment.rotation) * Math.PI) / 180)
    context.scale(adjustment.flipX ? -1 : 1, adjustment.flipY ? -1 : 1)
    context.drawImage(
      image,
      rect.x - width / 2 + adjustment.offsetX * scaleX,
      rect.y - height / 2 + adjustment.offsetY * scaleY,
      rect.width * adjustment.scale,
      rect.height * adjustment.scale,
    )
  } else {
    drawMissingImage(context, x, y, width, height)
  }
  context.restore()

  if (element.borderWidth && element.borderWidth > 0) {
    context.save()
    context.strokeStyle = element.borderColor ?? '#ffffff'
    context.lineWidth = element.borderWidth * scale
    buildImagePath(context, element, x, y, width, height, scale)
    context.stroke()
    context.restore()
  }
}

function resolveImageUrl(element: TemplateImageElement, sources: TemplateThumbnailSources) {
  if (element.source === 'original') return sources.original
  if (element.source === 'avatarA') {
    return element.shape === 'circle'
      ? sources.avatarACircle ?? sources.original
      : sources.avatarASquare ?? sources.original
  }
  if (element.source === 'avatarB') {
    return element.shape === 'circle'
      ? sources.avatarBCircle ?? sources.original
      : sources.avatarBSquare ?? sources.original
  }
  return sources.original
}

async function loadCachedImage(url: string, imageCache: Map<string, HTMLImageElement>) {
  const cached = imageCache.get(url)
  if (cached) return cached
  try {
    const image = await loadImageElement(url)
    imageCache.set(url, image)
    return image
  } catch {
    return null
  }
}

function drawImageShadow(
  context: CanvasRenderingContext2D,
  element: TemplateImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
  scaleX: number,
  scaleY: number,
) {
  if (!element.shadowColor || !element.shadowBlur) return
  context.save()
  context.shadowColor = element.shadowColor
  context.shadowBlur = element.shadowBlur * scale
  context.shadowOffsetX = (element.shadowOffsetX ?? 0) * scaleX
  context.shadowOffsetY = (element.shadowOffsetY ?? 0) * scaleY
  context.fillStyle = 'rgba(0,0,0,0.2)'
  buildImagePath(context, element, x, y, width, height, scale)
  context.fill()
  context.restore()
}

function buildImagePath(
  context: CanvasRenderingContext2D,
  element: TemplateImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
) {
  context.beginPath()
  if (element.shape === 'circle') {
    context.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2)
    return
  }
  if (element.shape === 'rounded-rectangle') {
    applyRoundedClip(context, x, y, width, height, (element.borderRadius ?? 24) * scale)
    return
  }
  context.rect(x, y, width, height)
}

function getContainRect(sourceRatio: number, targetWidth: number, targetHeight: number) {
  const targetRatio = targetWidth / targetHeight
  if (sourceRatio > targetRatio) {
    const width = targetWidth
    const height = width / sourceRatio
    return { x: 0, y: (targetHeight - height) / 2, width, height }
  }
  const height = targetHeight
  const width = height * sourceRatio
  return { x: (targetWidth - width) / 2, y: 0, width, height }
}

function drawMissingImage(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
  context.fillStyle = '#f0eee8'
  context.fillRect(x, y, width, height)
  context.strokeStyle = 'rgba(0,0,0,0.08)'
  context.lineWidth = 1
  context.strokeRect(x + 0.5, y + 0.5, Math.max(0, width - 1), Math.max(0, height - 1))
}
