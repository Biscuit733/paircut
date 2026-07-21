import type { CouplePosterTemplate } from '../types'
import { sortedElements } from './scaleTemplate'

export function makeTemplateThumbnail(template: CouplePosterTemplate) {
  const width = 270
  const height = 360
  const scaleX = width / template.canvasWidth
  const scaleY = height / template.canvasHeight
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return ''
  context.fillStyle = template.backgroundColor
  context.fillRect(0, 0, width, height)
  for (const element of sortedElements(template.elements)) {
    context.save()
    if (element.type === 'shape') {
      context.globalAlpha = element.opacity ?? 1
      context.fillStyle = element.fill
      context.fillRect(element.x * scaleX, element.y * scaleY, element.width * scaleX, element.height * scaleY)
    }
    if (element.type === 'image') {
      const x = element.x * scaleX
      const y = element.y * scaleY
      const w = element.width * scaleX
      const h = element.height * scaleY
      context.fillStyle = element.source === 'original' ? '#a6d8e8' : element.source === 'avatarA' ? '#ffe0df' : '#d6eadf'
      context.beginPath()
      if (element.shape === 'circle') context.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
      else context.rect(x, y, w, h)
      context.fill()
      context.fillStyle = '#171717'
      context.font = '12px sans-serif'
      context.textAlign = 'center'
      context.fillText(element.source, x + w / 2, y + h / 2)
    }
    if (element.type === 'text') {
      context.fillStyle = element.color
      context.strokeStyle = element.strokeColor ?? element.color
      context.lineWidth = Math.max(0, (element.strokeWidth ?? 0) * scaleY)
      context.lineJoin = 'round'
      context.font = `${Math.max(9, element.fontSize * scaleY)}px sans-serif`
      context.textAlign = element.textAlign
      const x = (element.x + element.width / 2) * scaleX
      if (element.strokeWidth) context.strokeText(element.text.slice(0, 16), x, element.y * scaleY)
      context.fillText(element.text.slice(0, 16), x, element.y * scaleY)
    }
    context.restore()
  }
  return canvas.toDataURL('image/png')
}
