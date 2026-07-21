import type { ImageAsset } from '../uploader/types'

export type CollageSlot = {
  id: string
  x: number
  y: number
  width: number
  height: number
  borderRadius: number
}

export type CollageTemplate = {
  id: string
  name: string
  supportedImageCounts: number[]
  slots: CollageSlot[]
  visualPriority: number
}

export type CollageImageState = {
  imageId: string
  slotId: string
  scale: number
  offsetX: number
  offsetY: number
  rotation: number
  flipX: boolean
  flipY: boolean
}

export type CollageStyle = {
  gap: number
  padding: number
  radius: number
  backgroundColor: string
  borderColor: string
  borderWidth: number
  shadow: boolean
  shadowBlur: number
  shadowOpacity: number
}

export type SmartLayoutResult = {
  templateId: string
  score: number
  assignments: Array<{
    imageId: string
    slotId: string
  }>
}

export type CollageImageAsset = ImageAsset

