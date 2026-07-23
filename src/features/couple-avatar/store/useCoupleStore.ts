import { create } from 'zustand'
import type { CropConfig } from '../../cropper/types'
import type { ImageAsset } from '../../uploader/types'
import type { CoupleAvatarKey } from '../types'
import { defaultCropConfig } from '../../cropper/utils/cropImage'
import { revokeImageAsset } from '../../../utils/image'

type CoupleStore = {
  sourceImage: ImageAsset | null
  singleImage: ImageAsset | null
  activeAvatar: CoupleAvatarKey
  avatarA: CropConfig
  avatarB: CropConfig
  singleCrop: CropConfig
  setSourceImage: (asset: ImageAsset) => void
  setSingleImage: (asset: ImageAsset) => void
  setActiveAvatar: (avatar: CoupleAvatarKey) => void
  updateAvatar: (avatar: CoupleAvatarKey, patch: Partial<CropConfig>) => void
  updateSingleCrop: (patch: Partial<CropConfig>) => void
  restoreAvatarState: (avatarA: CropConfig, avatarB: CropConfig) => void
  splitEvenly: () => void
  swapAvatars: () => void
  copyAToB: () => void
  resetAvatar: (avatar: CoupleAvatarKey) => void
}

function cropForSide(side: CoupleAvatarKey): CropConfig {
  return defaultCropConfig({
    crop: { x: side === 'a' ? 70 : -70, y: 0 },
    croppedAreaPixels: null,
  })
}

export const useCoupleStore = create<CoupleStore>((set) => ({
  sourceImage: null,
  singleImage: null,
  activeAvatar: 'a',
  avatarA: cropForSide('a'),
  avatarB: cropForSide('b'),
  singleCrop: defaultCropConfig({ shape: 'square' }),
  setSourceImage: (asset) =>
    set((state) => {
      revokeImageAsset(state.sourceImage)
      return {
        sourceImage: asset,
        activeAvatar: 'a',
        avatarA: cropForSide('a'),
        avatarB: cropForSide('b'),
      }
    }),
  setSingleImage: (asset) =>
    set((state) => {
      revokeImageAsset(state.singleImage)
      return { singleImage: asset, singleCrop: defaultCropConfig({ shape: 'square' }) }
    }),
  setActiveAvatar: (activeAvatar) =>
    set((state) => {
      if (state.activeAvatar === activeAvatar) return { activeAvatar }
      const sourceConfig = state.activeAvatar === 'a' ? state.avatarA : state.avatarB
      const syncPatch = {
        shape: sourceConfig.shape,
        aspectRatio: sourceConfig.aspectRatio,
        zoom: sourceConfig.zoom,
        outputWidth: sourceConfig.outputWidth,
        outputHeight: sourceConfig.outputHeight,
      }
      return activeAvatar === 'a'
        ? { activeAvatar, avatarA: { ...state.avatarA, ...syncPatch } }
        : { activeAvatar, avatarB: { ...state.avatarB, ...syncPatch } }
    }),
  updateAvatar: (avatar, patch) =>
    set((state) =>
      avatar === 'a'
        ? { avatarA: { ...state.avatarA, ...patch } }
        : { avatarB: { ...state.avatarB, ...patch } },
    ),
  updateSingleCrop: (patch) => set((state) => ({ singleCrop: { ...state.singleCrop, ...patch } })),
  restoreAvatarState: (avatarA, avatarB) => set({ avatarA, avatarB, activeAvatar: 'a' }),
  splitEvenly: () =>
    set((state) => ({
      avatarA: { ...state.avatarA, crop: { x: 70, y: 0 }, zoom: 1 },
      avatarB: { ...state.avatarB, crop: { x: -70, y: 0 }, zoom: 1 },
    })),
  swapAvatars: () => set((state) => ({ avatarA: state.avatarB, avatarB: state.avatarA })),
  copyAToB: () => set((state) => ({ avatarB: { ...state.avatarA } })),
  resetAvatar: (avatar) =>
    set((state) =>
      avatar === 'a'
        ? { avatarA: cropForSide('a') }
        : { avatarB: cropForSide('b'), activeAvatar: state.activeAvatar },
    ),
}))
