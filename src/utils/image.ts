import type { ImageAsset, ImageRatioKind } from '../features/uploader/types'
import { isSupportedImage } from './validation'

export function classifyImageRatio(ratio: number): ImageRatioKind {
  if (ratio > 1.12) return 'landscape'
  if (ratio < 0.88) return 'portrait'
  return 'square'
}

export function clampCropArea(
  area: { x: number; y: number; width: number; height: number },
  imageWidth: number,
  imageHeight: number,
) {
  const width = Math.min(Math.max(1, area.width), imageWidth)
  const height = Math.min(Math.max(1, area.height), imageHeight)
  const x = Math.min(Math.max(0, area.x), imageWidth - width)
  const y = Math.min(Math.max(0, area.y), imageHeight - height)
  return { x, y, width, height }
}

export async function loadImageElement(src: string) {
  const image = new Image()
  image.decoding = 'async'
  image.src = src
  await image.decode()
  return image
}

async function decodeBitmap(file: File) {
  if ('createImageBitmap' in window) {
    return createImageBitmap(file, { imageOrientation: 'from-image' })
  }
  const objectUrl = URL.createObjectURL(file)
  try {
    const image = await loadImageElement(objectUrl)
    return image
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export async function makePreviewUrl(source: CanvasImageSource, width: number, height: number) {
  const maxSide = 1400
  const scale = Math.min(1, maxSide / Math.max(width, height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width * scale))
  canvas.height = Math.max(1, Math.round(height * scale))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('无法创建图片预览。')
  context.drawImage(source, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.86)
}

export async function createImageAsset(file: File): Promise<ImageAsset> {
  if (!isSupportedImage(file)) {
    throw new Error('只支持 JPG、PNG 和 WebP 图片。')
  }
  const bitmap = await decodeBitmap(file)
  const width = bitmap.width
  const height = bitmap.height
  const previewUrl = await makePreviewUrl(bitmap, width, height)
  if ('close' in bitmap) bitmap.close()
  return {
    id: crypto.randomUUID(),
    file,
    name: file.name,
    objectUrl: URL.createObjectURL(file),
    previewUrl,
    width,
    height,
    aspectRatio: width / height,
    size: file.size,
  }
}

export function revokeImageAsset(asset: ImageAsset | null) {
  if (!asset) return
  URL.revokeObjectURL(asset.objectUrl)
}

