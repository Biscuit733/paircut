import type { CropConfig, ExportFormat } from '../cropper/types'
import type { ImageAsset } from '../uploader/types'
import type { CouplePosterTemplate } from '../couple-template/types'

export type CoupleZipInput = {
  sourceImage: ImageAsset
  avatarA: CropConfig
  avatarB: CropConfig
  workName: string
  format: ExportFormat
  quality: number
  template?: CouplePosterTemplate
}

