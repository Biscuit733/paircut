import { useCallback, useEffect, useRef, useState } from 'react'
import { ImagePlus, Loader2, UploadCloud } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { createImageAsset } from '../../../utils/image'
import type { ImageAsset } from '../types'
import { formatFileSize } from '../../../utils/file'

type ImageUploaderProps = {
  multiple?: boolean
  label: string
  description: string
  onImages: (images: ImageAsset[]) => void
}

export function ImageUploader({ multiple = false, label, description, onImages }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ingestFiles = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
      if (imageFiles.length === 0) return
      setIsLoading(true)
      setError(null)
      try {
        const assets = await Promise.all(imageFiles.slice(0, multiple ? 20 : 1).map(createImageAsset))
        onImages(assets)
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : '图片解析失败。'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [multiple, onImages],
  )

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const files = event.clipboardData?.files
      if (files?.length) void ingestFiles(files)
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [ingestFiles])

  return (
    <div
      className={`grid gap-3 rounded-xl border border-dashed p-4 text-sm transition-colors ${
        isDragging ? 'border-[#ff6b6b] bg-[#fff1f1]' : 'border-[#d4d4d4] bg-[#fbfaf7]'
      }`}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        void ingestFiles(event.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        multiple={multiple}
        type="file"
        onChange={(event) => {
          if (event.target.files) void ingestFiles(event.target.files)
          event.currentTarget.value = ''
        }}
      />
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white p-2 text-[#ff6b6b] shadow-sm">
          {isLoading ? <Loader2 className="animate-spin" size={22} /> : <UploadCloud size={22} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[#171717]">{label}</p>
          <p className="mt-1 text-xs leading-5 text-[#737373]">{description}</p>
        </div>
      </div>
      <Button icon={<ImagePlus size={16} />} onClick={() => inputRef.current?.click()}>
        {multiple ? '选择多张图片' : '选择图片'}
      </Button>
      <p className="text-xs text-[#8a8a8a]">支持拖拽、点击上传和粘贴剪贴板图片，最多 {multiple ? '20 张' : '1 张'}。</p>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

export function ImageMeta({ asset }: { asset: ImageAsset | null }) {
  if (!asset) return null
  return (
    <div className="grid gap-2 rounded-xl border border-[#eeeeee] bg-white p-3 text-xs text-[#737373]">
      <img alt={asset.name} className="aspect-video w-full rounded-lg object-cover" src={asset.previewUrl} />
      <p className="truncate font-medium text-[#171717]">{asset.name}</p>
      <p>
        {asset.width} x {asset.height} · {asset.aspectRatio.toFixed(2)} · {formatFileSize(asset.size)}
      </p>
    </div>
  )
}

