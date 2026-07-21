export type ImageAsset = {
  id: string
  file: File
  name: string
  objectUrl: string
  previewUrl: string
  width: number
  height: number
  aspectRatio: number
  size: number
}

export type ImageRatioKind = 'landscape' | 'portrait' | 'square'

