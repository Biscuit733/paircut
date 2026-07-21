import type { ExportFormat } from '../features/cropper/types'

export function isSupportedImage(file: File) {
  return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
}

export function mimeForFormat(format: ExportFormat) {
  return `image/${format}`
}

export function assertCanvasSize(width: number, height: number) {
  const maxSide = 16384
  const maxArea = 268_435_456
  if (width > maxSide || height > maxSide || width * height > maxArea) {
    throw new Error('导出尺寸超过当前浏览器 Canvas 限制，请降低输出尺寸。')
  }
}

