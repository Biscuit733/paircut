import type { CropConfig } from '../../cropper/types'
import type { TemplateImageElement, TemplateRenderSources } from '../types'
import { renderCroppedCanvas } from '../../cropper/utils/cropImage'
import { loadImageElement } from '../../../utils/image'

export async function resolveTemplateSource(
  element: TemplateImageElement,
  sources: TemplateRenderSources,
  scale = 1,
): Promise<{ image: CanvasImageSource; ratio: number }> {
  if (element.source === 'original') {
    const image = await loadImageElement(sources.original.objectUrl)
    return { image, ratio: sources.original.aspectRatio }
  }
  const cropConfig: CropConfig = element.source === 'avatarA' ? sources.avatarA : sources.avatarB
  const outputWidth = Math.max(128, Math.round(element.width * scale))
  const outputHeight = Math.max(128, Math.round(element.height * scale))
  const shouldRenderCircle = element.shape === 'circle'
  const isSquareSlot = Math.abs(outputWidth - outputHeight) <= 2
  const canvas = await renderCroppedCanvas(
    sources.original,
    {
      ...cropConfig,
      shape: shouldRenderCircle ? 'circle' : isSquareSlot ? 'square' : 'rectangle',
      aspectRatio: shouldRenderCircle || isSquareSlot ? 1 : outputWidth / outputHeight,
      outputWidth,
      outputHeight,
    },
    { format: 'png' },
  )
  return { image: canvas, ratio: outputWidth / outputHeight }
}
