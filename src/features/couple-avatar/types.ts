import type { CropConfig } from '../cropper/types'
import type { ImageAsset } from '../uploader/types'

export type CoupleAvatarKey = 'a' | 'b'

export type CoupleAvatarState = {
  sourceImage: ImageAsset | null
  activeAvatar: CoupleAvatarKey
  avatarA: CropConfig
  avatarB: CropConfig
}

