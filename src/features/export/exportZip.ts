import JSZip from 'jszip'
import type { CropConfig } from '../cropper/types'
import { renderCroppedBlob, renderCroppedCanvas } from '../cropper/utils/cropImage'
import { renderTemplateToBlob } from '../couple-template/utils/renderTemplate'
import { originalDoubleCircleDark } from '../couple-template/templates/originalDoubleCircleDark'
import type { CoupleZipInput } from './types'
import { sanitizeFileName } from '../../utils/file'

export async function exportCoupleZip(input: CoupleZipInput) {
  const safeName = sanitizeFileName(input.workName)
  const zip = new JSZip()
  const root = zip.folder('biscuit-avatar-export')
  if (!root) throw new Error('无法创建 ZIP 目录。')

  root.folder('original')?.file(`${safeName}-original-${input.sourceImage.name}`, input.sourceImage.file)
  const [avatarACircle, avatarASquare, avatarBCircle, avatarBSquare] = await Promise.all([
    renderCroppedBlob(input.sourceImage, makeAvatarVariant(input.avatarA, 'circle'), { format: 'png', quality: input.quality }),
    renderCroppedBlob(input.sourceImage, makeAvatarVariant(input.avatarA, 'square'), { format: 'png', quality: input.quality }),
    renderCroppedBlob(input.sourceImage, makeAvatarVariant(input.avatarB, 'circle'), { format: 'png', quality: input.quality }),
    renderCroppedBlob(input.sourceImage, makeAvatarVariant(input.avatarB, 'square'), { format: 'png', quality: input.quality }),
  ])
  root.folder('avatars')?.file(`${safeName}-avatar-a-circle.png`, avatarACircle)
  root.folder('avatars')?.file(`${safeName}-avatar-a-square.png`, avatarASquare)
  root.folder('avatars')?.file(`${safeName}-avatar-b-circle.png`, avatarBCircle)
  root.folder('avatars')?.file(`${safeName}-avatar-b-square.png`, avatarBSquare)
  root.folder('preview')?.file(`${safeName}-preview.png`, await makeCouplePreview(input.sourceImage, input.avatarA, input.avatarB))
  const template = input.template ?? originalDoubleCircleDark
  const templateWidth = input.templateOutput?.width ?? template.canvasWidth
  const templateHeight = input.templateOutput?.height ?? template.canvasHeight
  root.folder('templates')?.file(
    `${safeName}-selected-template.png`,
    await renderTemplateToBlob(template, { original: input.sourceImage, avatarA: input.avatarA, avatarB: input.avatarB }, { format: 'png', quality: 0.94, width: templateWidth, height: templateHeight }),
  )
  root.file(
    'export-info.json',
    JSON.stringify(
      {
        original: {
          name: input.sourceImage.name,
          width: input.sourceImage.width,
          height: input.sourceImage.height,
          aspectRatio: input.sourceImage.aspectRatio,
        },
        outputFormat: input.format,
        avatarA: input.avatarA,
        avatarB: input.avatarB,
        avatarFiles: [
          `${safeName}-avatar-a-circle.png`,
          `${safeName}-avatar-a-square.png`,
          `${safeName}-avatar-b-circle.png`,
          `${safeName}-avatar-b-square.png`,
        ],
        templateId: template.id,
        templateOutput: { width: templateWidth, height: templateHeight },
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  )
  return zip.generateAsync({ type: 'blob' })
}

function makeAvatarVariant(config: CropConfig, shape: 'circle' | 'square'): CropConfig {
  return {
    ...config,
    shape,
    aspectRatio: 1,
    outputWidth: 800,
    outputHeight: 800,
  }
}

async function makeCouplePreview(sourceImage: CoupleZipInput['sourceImage'], avatarA: CropConfig, avatarB: CropConfig) {
  const [canvasA, canvasB] = await Promise.all([
    renderCroppedCanvas(sourceImage, makeAvatarVariant(avatarA, 'circle'), { format: 'png' }),
    renderCroppedCanvas(sourceImage, makeAvatarVariant(avatarB, 'circle'), { format: 'png' }),
  ])
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 640
  const context = canvas.getContext('2d')
  if (!context) throw new Error('无法创建预览图。')
  context.fillStyle = '#f5f4f0'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(canvasA, 130, 64, 420, 420)
  context.drawImage(canvasB, 530, 64, 420, 420)
  context.fillStyle = '#171717'
  context.font = '500 34px sans-serif'
  context.textAlign = 'center'
  context.fillText('Biscuit 情头工坊预览', 540, 560)
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('组合预览导出失败。'))), 'image/png')
  })
}
