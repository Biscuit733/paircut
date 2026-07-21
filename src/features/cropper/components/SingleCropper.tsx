import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Panel } from '../../../components/ui/Panel'
import { ImageMeta, ImageUploader } from '../../uploader/components/ImageUploader'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import { CropEditor } from './CropEditor'
import { CropPreview } from './CropPreview'
import { renderCroppedBlob } from '../utils/cropImage'
import type { ExportFormat } from '../types'
import { downloadBlob, extensionForFormat, sanitizeFileName } from '../../../utils/file'
import type { ToastState } from '../../../components/ui/Toast'

export function SingleCropper({ setToast }: { setToast: (toast: ToastState) => void }) {
  const { singleImage, singleCrop, setSingleImage, updateSingleCrop } = useCoupleStore()
  const [guide, setGuide] = useState<'grid' | 'cross' | 'safe' | 'none'>('grid')
  const [format, setFormat] = useState<ExportFormat>('png')
  const [isExporting, setIsExporting] = useState(false)

  const exportSingle = async () => {
    if (!singleImage) return
    setIsExporting(true)
    try {
      const blob = await renderCroppedBlob(singleImage, singleCrop, { format, quality: 0.92 })
      downloadBlob(blob, `${sanitizeFileName(singleImage.name.replace(/\.[^.]+$/, ''))}-crop.${extensionForFormat(format)}`)
      setToast({ type: 'success', message: '单图裁剪已导出。' })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : '导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_260px]">
      <Panel className="grid content-start gap-4">
        <ImageUploader description="适合制作单个头像、封面和任意比例裁剪图。" label="上传单张图片" onImages={(assets) => setSingleImage(assets[0])} />
        <ImageMeta asset={singleImage} />
      </Panel>
      {singleImage ? (
        <CropEditor asset={singleImage} config={singleCrop} guide={guide} onChange={updateSingleCrop} onGuideChange={setGuide} />
      ) : (
        <Panel className="grid min-h-[520px] place-items-center text-center text-[#737373]">上传图片后开始裁剪。</Panel>
      )}
      <Panel className="grid content-start gap-4">
        <CropPreview asset={singleImage} config={singleCrop} label="单图预览" />
        <select className="rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm" value={format} onChange={(event) => setFormat(event.target.value as ExportFormat)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
          <option value="webp">WebP</option>
        </select>
        <Button disabled={!singleImage || isExporting} icon={<Download size={16} />} variant="primary" onClick={() => void exportSingle()}>
          导出单图
        </Button>
      </Panel>
    </div>
  )
}

