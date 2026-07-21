import type { CropConfig, ExportFormat } from '../cropper/types'
import type { ImageAsset } from '../uploader/types'
import { renderCroppedBlob } from '../cropper/utils/cropImage'

export function exportAvatarImage(asset: ImageAsset, config: CropConfig, format: ExportFormat, quality: number) {
  return renderCroppedBlob(asset, config, { format, quality })
}

