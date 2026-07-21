export type CropShape = 'circle' | 'square' | 'rectangle' | 'free'

export type ExportFormat = 'png' | 'jpeg' | 'webp'

export type CroppedAreaPixels = {
  x: number
  y: number
  width: number
  height: number
}

export type CropConfig = {
  shape: CropShape
  aspectRatio: number | null
  crop: {
    x: number
    y: number
  }
  zoom: number
  rotation: number
  flipX: boolean
  flipY: boolean
  croppedAreaPixels: CroppedAreaPixels | null
  outputWidth: number
  outputHeight: number
  backgroundColor: string
}

