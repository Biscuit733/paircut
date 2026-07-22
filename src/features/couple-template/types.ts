import type { CropConfig, ExportFormat } from '../cropper/types'
import type { ImageAsset } from '../uploader/types'

export type TemplateSourceType = 'original' | 'avatarA' | 'avatarB' | 'custom'
export type TemplateElementType = 'image' | 'text' | 'shape' | 'decoration'
export type TemplateImageShape = 'rectangle' | 'rounded-rectangle' | 'circle'

export type TemplateImageAdjustment = {
  scale: number
  offsetX: number
  offsetY: number
  rotation: number
  flipX: boolean
  flipY: boolean
}

export type TemplateImageElement = {
  id: string
  type: 'image'
  source: TemplateSourceType
  x: number
  y: number
  width: number
  height: number
  shape: TemplateImageShape
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  objectFit: 'cover' | 'contain'
  rotation?: number
  locked?: boolean
  visible?: boolean
  adjustment?: TemplateImageAdjustment
  zIndex: number
}

export type TemplateTextElement = {
  id: string
  type: 'text'
  text: string
  x: number
  y: number
  width: number
  height?: number
  fontSize: number
  fontFamily: string
  fontWeight: number
  color: string
  textAlign: 'left' | 'center' | 'right'
  letterSpacing?: number
  lineHeight?: number
  strokeColor?: string
  strokeWidth?: number
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  rotation?: number
  editable: boolean
  visible?: boolean
  zIndex: number
}

export type TemplateShapeElement = {
  id: string
  type: 'shape'
  shape: 'rectangle' | 'circle' | 'line'
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke?: string
  strokeWidth?: number
  borderRadius?: number
  opacity?: number
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  visible?: boolean
  zIndex: number
}

export type CoupleTemplateElement = TemplateImageElement | TemplateTextElement | TemplateShapeElement

export type CouplePosterTemplate = {
  id: string
  name: string
  category: string
  thumbnail: string
  canvasWidth: number
  canvasHeight: number
  backgroundColor: string
  elements: CoupleTemplateElement[]
}

export type TemplateRenderSources = {
  original: ImageAsset
  avatarA: CropConfig
  avatarB: CropConfig
}

export type TemplateExportOptions = {
  format: ExportFormat
  quality: number
  width: number
  height: number
}
