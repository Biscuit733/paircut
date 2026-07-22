import type {
  CouplePosterTemplate,
  TemplateExportOptions,
  TemplateImageElement,
  TemplateRenderSources,
  TemplateShapeElement,
  TemplateTextElement,
} from '../types'
import { applyRoundedClip, getCoverRect } from '../../../utils/canvas'
import { assertCanvasSize, mimeForFormat } from '../../../utils/validation'
import { resolveTemplateSource } from './resolveTemplateSource'
import { sortedElements } from './scaleTemplate'

export async function renderTemplateToCanvas(
  template: CouplePosterTemplate,
  sources: TemplateRenderSources,
  options: Pick<TemplateExportOptions, 'width' | 'height'>,
) {
  assertCanvasSize(options.width, options.height)
  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('无法创建模板画布。')
  const scaleX = options.width / template.canvasWidth
  const scaleY = options.height / template.canvasHeight
  context.fillStyle = template.backgroundColor
  context.fillRect(0, 0, options.width, options.height)
  await document.fonts.ready

  for (const element of sortedElements(template.elements)) {
    if (element.type === 'shape') drawShape(context, element, scaleX, scaleY)
    if (element.type === 'text') drawText(context, element, scaleX, scaleY)
    if (element.type === 'image') await drawImageElement(context, element, sources, scaleX, scaleY)
  }
  return canvas
}

export async function renderTemplateToBlob(template: CouplePosterTemplate, sources: TemplateRenderSources, options: TemplateExportOptions) {
  const canvas = await renderTemplateToCanvas(template, sources, options)
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('模板导出失败。'))
      },
      mimeForFormat(options.format),
      options.quality,
    )
  })
}

function drawShape(context: CanvasRenderingContext2D, element: TemplateShapeElement, scaleX: number, scaleY: number) {
  const x = element.x * scaleX
  const y = element.y * scaleY
  const width = element.width * scaleX
  const height = element.height * scaleY
  context.save()
  context.globalAlpha = element.opacity ?? 1
  context.fillStyle = element.fill
  context.strokeStyle = element.stroke ?? element.fill
  context.lineWidth = (element.strokeWidth ?? 0) * Math.max(scaleX, scaleY)
  context.shadowColor = element.shadowColor ?? 'transparent'
  context.shadowBlur = (element.shadowBlur ?? 0) * Math.max(scaleX, scaleY)
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
    applyRoundedClip(context, x, y, width, height, (element.borderRadius ?? 0) * Math.max(scaleX, scaleY))
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
  wrapText(context, element.text, anchorX, y, width, fontSize * (element.lineHeight ?? 1.25), element.strokeWidth ?? 0)
  context.restore()
}

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, strokeWidth: number) {
  const words = text.split('')
  let line = ''
  let currentY = y
  for (const word of words) {
    const testLine = line + word
    if (context.measureText(testLine).width > maxWidth && line) {
      if (strokeWidth > 0) context.strokeText(line, x, currentY)
      context.fillText(line, x, currentY)
      line = word
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (strokeWidth > 0) context.strokeText(line, x, currentY)
  context.fillText(line, x, currentY)
}

async function drawImageElement(
  context: CanvasRenderingContext2D,
  element: TemplateImageElement,
  sources: TemplateRenderSources,
  scaleX: number,
  scaleY: number,
) {
  const x = element.x * scaleX
  const y = element.y * scaleY
  const width = element.width * scaleX
  const height = element.height * scaleY
  const source = await resolveTemplateSource(element, sources, Math.max(scaleX, scaleY) * 2)
  const adjustment = element.adjustment ?? { scale: 1, offsetX: 0, offsetY: 0, rotation: 0, flipX: false, flipY: false }
  context.save()
  drawImageShadow(context, element, x, y, width, height, Math.max(scaleX, scaleY), scaleX, scaleY)
  clipImageShape(context, element, x, y, width, height, Math.max(scaleX, scaleY))
  const rect =
    element.objectFit === 'contain'
      ? getContainRect(source.ratio, width, height)
      : getCoverRect(source.ratio, width, height)
  context.translate(x + width / 2, y + height / 2)
  context.rotate((((element.rotation ?? 0) + adjustment.rotation) * Math.PI) / 180)
  context.scale(adjustment.flipX ? -1 : 1, adjustment.flipY ? -1 : 1)
  context.drawImage(
    source.image,
    rect.x - width / 2 + adjustment.offsetX * scaleX,
    rect.y - height / 2 + adjustment.offsetY * scaleY,
    rect.width * adjustment.scale,
    rect.height * adjustment.scale,
  )
  context.restore()
  if (element.borderWidth && element.borderWidth > 0) {
    context.save()
    context.strokeStyle = element.borderColor ?? '#ffffff'
    context.lineWidth = element.borderWidth * Math.max(scaleX, scaleY)
    clipImageShape(context, element, x, y, width, height, Math.max(scaleX, scaleY))
    context.stroke()
    context.restore()
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
  context.fillStyle = 'rgba(0,0,0,0.22)'
  buildImagePath(context, element, x, y, width, height, scale)
  context.fill()
  context.restore()
}

function clipImageShape(
  context: CanvasRenderingContext2D,
  element: TemplateImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number,
) {
  buildImagePath(context, element, x, y, width, height, scale)
  context.clip()
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
