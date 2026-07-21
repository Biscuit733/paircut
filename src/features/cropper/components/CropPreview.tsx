import { useEffect, useState } from 'react'
import type { CropConfig } from '../types'
import type { ImageAsset } from '../../uploader/types'
import { renderCroppedDataUrl } from '../utils/cropImage'

export function CropPreview({ asset, config, label }: { asset: ImageAsset | null; config: CropConfig; label: string }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!asset || !config.croppedAreaPixels) {
      setUrl(null)
      return
    }
    const timer = window.setTimeout(() => {
      void renderCroppedDataUrl(asset, config).then((nextUrl) => {
        if (!cancelled) setUrl(nextUrl)
      })
    }, 120)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [asset, config])

  return (
    <div className="grid gap-2">
      <div className="checkerboard grid aspect-square place-items-center overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
        {url ? <img alt={label} className="h-full w-full object-contain" src={url} /> : <span className="text-xs text-[#8a8a8a]">等待裁剪</span>}
      </div>
      <p className="text-center text-sm font-medium">{label}</p>
    </div>
  )
}

