import type { CollageImageState, CollageStyle, CollageTemplate } from '../types'
import type { ImageAsset } from '../../uploader/types'
import { applyRoundedClip, getCoverRect } from '../../../utils/canvas'
import { loadImageElement } from '../../../utils/image'
import { assertCanvasSize, mimeForFormat } from '../../../utils/validation'
import type { ExportFormat } from '../../cropper/types'

export async function renderCollageToBlob({
  images,
  template,
  states,
  style,
  width,
  height,
  format,
  quality,
}: {
  images: ImageAsset[]
  template: CollageTemplate
  states: CollageImageState[]
  style: CollageStyle
  width: number
  height: number
  format: ExportFormat
  quality: number
}) {
  assertCanvasSize(width, height)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('无法创建拼图画布。')
  context.fillStyle = style.backgroundColor
  context.fillRect(0, 0, width, height)
  const drawableWidth = width - style.padding * 2
  const drawableHeight = height - style.padding * 2
  for (const slot of template.slots.slice(0, images.length)) {
    const state = states.find((item) => item.slotId === slot.id)
    const image = images.find((item) => item.id === state?.imageId)
    if (!state || !image) continue
    const htmlImage = await loadImageElement(image.objectUrl)
    const x = style.padding + slot.x * drawableWidth + style.gap / 2
    const y = style.padding + slot.y * drawableHeight + style.gap / 2
    const slotWidth = slot.width * drawableWidth - style.gap
    const slotHeight = slot.height * drawableHeight - style.gap
    context.save()
    if (style.shadow) {
      context.shadowColor = `rgba(0,0,0,${style.shadowOpacity})`
      context.shadowBlur = style.shadowBlur
    }
    applyRoundedClip(context, x, y, slotWidth, slotHeight, style.radius)
    context.fillStyle = style.backgroundColor
    context.fill()
    context.clip()
    const rect = getCoverRect(image.aspectRatio, slotWidth, slotHeight)
    context.translate(x + slotWidth / 2, y + slotHeight / 2)
    context.rotate((state.rotation * Math.PI) / 180)
    context.scale(state.flipX ? -1 : 1, state.flipY ? -1 : 1)
    context.drawImage(htmlImage, rect.x - slotWidth / 2 + state.offsetX, rect.y - slotHeight / 2 + state.offsetY, rect.width * state.scale, rect.height * state.scale)
    context.restore()
    if (style.borderWidth > 0) {
      context.save()
      context.strokeStyle = style.borderColor
      context.lineWidth = style.borderWidth
      applyRoundedClip(context, x, y, slotWidth, slotHeight, style.radius)
      context.stroke()
      context.restore()
    }
  }
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('拼图导出失败。'))), mimeForFormat(format), quality)
  })
}

