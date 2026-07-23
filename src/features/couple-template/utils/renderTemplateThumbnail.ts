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
      context.beginPath()
      if (element.shape === 'circle') context.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
      else roundedRect(context, x, y, w, h, Math.min(16, Math.min(w, h) * 0.12))
      context.clip()
      drawSampleImage(context, element.source, x, y, w, h)
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

function drawSampleImage(context: CanvasRenderingContext2D, source: string, x: number, y: number, width: number, height: number) {
  const gradient = context.createLinearGradient(x, y, x + width, y + height)
  gradient.addColorStop(0, source === 'avatarB' ? '#dfefff' : '#ffe8ee')
  gradient.addColorStop(0.52, source === 'original' ? '#ffd589' : '#fff7dd')
  gradient.addColorStop(1, source === 'avatarA' ? '#d7f1e7' : '#3a3556')
  context.fillStyle = gradient
  context.fillRect(x, y, width, height)

  context.globalAlpha = 0.45
  context.fillStyle = '#ffffff'
  for (let index = 0; index < 7; index += 1) {
    const px = x + width * ((index * 0.17 + 0.12) % 1)
    const py = y + height * ((index * 0.29 + 0.08) % 1)
    context.fillRect(px, py, Math.max(2, width * 0.035), Math.max(2, width * 0.035))
  }
  context.globalAlpha = 1

  if (source === 'original') {
    drawPerson(context, x + width * 0.38, y + height * 0.58, Math.min(width, height) * 0.25, '#f0a2b4', '#fff4ee')
    drawPerson(context, x + width * 0.63, y + height * 0.58, Math.min(width, height) * 0.25, '#2f2b44', '#ffe0d7')
    return
  }

  drawPerson(
    context,
    x + width * 0.5,
    y + height * 0.58,
    Math.min(width, height) * 0.34,
    source === 'avatarA' ? '#f0a2b4' : '#2f2b44',
    source === 'avatarA' ? '#fff1ea' : '#ffe1d8',
  )
}

function drawPerson(context: CanvasRenderingContext2D, centerX: number, centerY: number, size: number, hairColor: string, skinColor: string) {
  context.fillStyle = hairColor
  context.beginPath()
  context.ellipse(centerX, centerY - size * 0.24, size * 0.62, size * 0.72, 0, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = skinColor
  context.beginPath()
  context.ellipse(centerX, centerY - size * 0.1, size * 0.45, size * 0.48, 0, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#312b38'
  context.beginPath()
  context.arc(centerX - size * 0.16, centerY - size * 0.1, Math.max(1.2, size * 0.035), 0, Math.PI * 2)
  context.arc(centerX + size * 0.16, centerY - size * 0.1, Math.max(1.2, size * 0.035), 0, Math.PI * 2)
  context.fill()
  context.strokeStyle = '#d95f76'
  context.lineWidth = Math.max(1, size * 0.035)
  context.beginPath()
  context.arc(centerX, centerY + size * 0.04, size * 0.14, 0.15, Math.PI - 0.15)
  context.stroke()
  context.fillStyle = '#ffffff'
  context.beginPath()
  roundedRect(context, centerX - size * 0.5, centerY + size * 0.36, size, size * 0.44, size * 0.16)
  context.fill()
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  context.moveTo(x + safeRadius, y)
  context.lineTo(x + width - safeRadius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  context.lineTo(x + width, y + height - safeRadius)
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  context.lineTo(x + safeRadius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  context.lineTo(x, y + safeRadius)
  context.quadraticCurveTo(x, y, x + safeRadius, y)
  context.closePath()
}
