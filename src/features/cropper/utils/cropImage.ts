import type { CropConfig, ExportFormat } from '../types'
import type { ImageAsset } from '../../uploader/types'
import { assertCanvasSize, mimeForFormat } from '../../../utils/validation'
import { clampCropArea, loadImageElement } from '../../../utils/image'
import { makeCircleMaskPath } from '../../../utils/canvas'

type CropExportOptions = {
  format: ExportFormat
  quality?: number
  backgroundColor?: string
}

export function defaultCropConfig(overrides: Partial<CropConfig> = {}): CropConfig {
  return {
    shape: 'circle',
    aspectRatio: 1,
    crop: { x: 0, y: 0 },
    zoom: 1,
    rotation: 0,
    flipX: false,
    flipY: false,
    croppedAreaPixels: null,
    outputWidth: 800,
    outputHeight: 800,
    backgroundColor: '#ffffff',
    ...overrides,
  }
}

export async function renderCroppedCanvas(asset: ImageAsset, config: CropConfig, options?: CropExportOptions) {
  const outputWidth = Math.round(config.outputWidth)
  const outputHeight = Math.round(config.outputHeight)
  assertCanvasSize(outputWidth, outputHeight)
  const image = await loadImageElement(asset.objectUrl)
  const area = clampCropArea(
    config.croppedAreaPixels ?? {
      x: asset.width * 0.25,
      y: 0,
      width: Math.min(asset.width / 2, asset.height),
      height: Math.min(asset.width / 2, asset.height),
    },
    asset.width,
    asset.height,
  )
  const canvas = document.createElement('canvas')
  canvas.width = outputWidth
  canvas.height = outputHeight
  const context = canvas.getContext('2d')
  if (!context) throw new Error('无法创建导出画布。')

  const format = options?.format ?? 'png'
  if (format !== 'png' || config.shape !== 'circle') {
    context.fillStyle = options?.backgroundColor ?? config.backgroundColor
    context.fillRect(0, 0, outputWidth, outputHeight)
  }

  context.save()
  if (config.shape === 'circle') {
    const mask = makeCircleMaskPath(outputWidth, outputHeight)
    context.beginPath()
    context.arc(mask.centerX, mask.centerY, mask.radius, 0, Math.PI * 2)
    context.clip()
  }
  context.translate(outputWidth / 2, outputHeight / 2)
  context.rotate((config.rotation * Math.PI) / 180)
  context.scale(config.flipX ? -1 : 1, config.flipY ? -1 : 1)
  context.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    -outputWidth / 2,
    -outputHeight / 2,
    outputWidth,
    outputHeight,
  )
  context.restore()
  return canvas
}

export async function renderCroppedBlob(asset: ImageAsset, config: CropConfig, options: CropExportOptions) {
  const canvas = await renderCroppedCanvas(asset, config, options)
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('图片导出失败。'))
      },
      mimeForFormat(options.format),
      options.quality ?? 0.92,
    )
  })
}

export async function renderCroppedDataUrl(asset: ImageAsset, config: CropConfig) {
  const canvas = await renderCroppedCanvas(asset, config, { format: 'png' })
  return canvas.toDataURL('image/png')
}

