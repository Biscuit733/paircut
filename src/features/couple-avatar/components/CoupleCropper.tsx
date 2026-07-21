import { useEffect, useState } from 'react'
import { Download, GalleryHorizontalEnd, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Panel } from '../../../components/ui/Panel'
import { Field } from '../../../components/ui/Field'
import { ImageMeta, ImageUploader } from '../../uploader/components/ImageUploader'
import { useCoupleStore } from '../store/useCoupleStore'
import { CropEditor } from '../../cropper/components/CropEditor'
import { CropPreview } from '../../cropper/components/CropPreview'
import { renderCroppedBlob, renderCroppedDataUrl } from '../../cropper/utils/cropImage'
import type { ExportFormat } from '../../cropper/types'
import { downloadBlob, extensionForFormat, sanitizeFileName } from '../../../utils/file'
import { exportCoupleZip } from '../../export/exportZip'
import type { ToastState } from '../../../components/ui/Toast'

type CoupleCropperProps = {
  onOpenTemplates: () => void
  setToast: (toast: ToastState) => void
}

export function CoupleCropper({ onOpenTemplates, setToast }: CoupleCropperProps) {
  const {
    sourceImage,
    activeAvatar,
    avatarA,
    avatarB,
    setSourceImage,
    setActiveAvatar,
    updateAvatar,
    splitEvenly,
    swapAvatars,
    copyAToB,
    resetAvatar,
  } = useCoupleStore()
  const [guide, setGuide] = useState<'grid' | 'cross' | 'safe' | 'none'>('grid')
  const [format, setFormat] = useState<ExportFormat>('png')
  const [quality, setQuality] = useState(0.92)
  const [workName, setWorkName] = useState('paircut')
  const [isExporting, setIsExporting] = useState(false)
  const [avatarAUrl, setAvatarAUrl] = useState<string | null>(null)
  const [avatarBUrl, setAvatarBUrl] = useState<string | null>(null)
  const activeConfig = activeAvatar === 'a' ? avatarA : avatarB

  useEffect(() => {
    let cancelled = false
    if (!sourceImage || !avatarA.croppedAreaPixels || !avatarB.croppedAreaPixels) {
      setAvatarAUrl(null)
      setAvatarBUrl(null)
      return
    }
    const timer = window.setTimeout(() => {
      void Promise.all([renderCroppedDataUrl(sourceImage, avatarA), renderCroppedDataUrl(sourceImage, avatarB)]).then(([aUrl, bUrl]) => {
        if (!cancelled) {
          setAvatarAUrl(aUrl)
          setAvatarBUrl(bUrl)
        }
      })
    }, 120)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [sourceImage, avatarA, avatarB])

  const exportAvatar = async (avatar: 'a' | 'b') => {
    if (!sourceImage) return
    setIsExporting(true)
    try {
      const config = avatar === 'a' ? avatarA : avatarB
      const blob = await renderCroppedBlob(sourceImage, config, { format, quality })
      downloadBlob(blob, `${sanitizeFileName(workName)}-avatar-${avatar}.${extensionForFormat(format)}`)
      setToast({ type: 'success', message: `头像 ${avatar.toUpperCase()} 已导出。` })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : '导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  const exportZip = async () => {
    if (!sourceImage) return
    setIsExporting(true)
    try {
      const blob = await exportCoupleZip({
        sourceImage,
        avatarA,
        avatarB,
        workName,
        format: 'png',
        quality,
      })
      downloadBlob(blob, `${sanitizeFileName(workName)}-paircut.zip`)
      setToast({ type: 'success', message: '整套情头 ZIP 已生成。' })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : 'ZIP 导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
      <Panel className="grid content-start gap-4">
        <ImageUploader
          description="上传一张 4:3 情侣原图，PairCut 会给 A/B 头像生成左右两侧的初始裁剪位置。"
          label="上传情侣原图"
          onImages={(assets) => setSourceImage(assets[0])}
        />
        <ImageMeta asset={sourceImage} />
        <div className="grid gap-2">
          <Button onClick={splitEvenly}>左右平均分配</Button>
          <Button onClick={swapAvatars}>交换 A/B</Button>
          <Button onClick={copyAToB}>复制 A 设置到 B</Button>
          <Button icon={<Sparkles size={16} />} onClick={splitEvenly}>
            居中人物
          </Button>
          <Button icon={<RotateCcw size={16} />} onClick={() => resetAvatar(activeAvatar)}>
            重置当前位置
          </Button>
        </div>
      </Panel>

      <main className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['a', 'b'] as const).map((avatar) => (
            <Button key={avatar} variant={activeAvatar === avatar ? 'primary' : 'secondary'} onClick={() => setActiveAvatar(avatar)}>
              头像 {avatar.toUpperCase()}
            </Button>
          ))}
          <Button variant="ghost">双头像预览</Button>
          <Button icon={<GalleryHorizontalEnd size={16} />} variant="primary" onClick={onOpenTemplates}>
            套用情头模板
          </Button>
        </div>
        {sourceImage ? (
          <CropEditor
            asset={sourceImage}
            config={activeConfig}
            guide={guide}
            onChange={(patch) => updateAvatar(activeAvatar, patch)}
            onGuideChange={setGuide}
          />
        ) : (
          <Panel className="grid min-h-[520px] place-items-center text-center text-[#737373]">
            <div>
              <p className="text-lg font-medium text-[#171717]">先上传一张情侣原图</p>
              <p className="mt-2 text-sm">所有处理都在浏览器本地完成，不会上传到服务器。</p>
            </div>
          </Panel>
        )}
      </main>

      <Panel className="grid content-start gap-4">
        <div className="grid grid-cols-2 gap-3">
          <CropPreview asset={sourceImage} config={avatarA} label="头像 A" />
          <CropPreview asset={sourceImage} config={avatarB} label="头像 B" />
        </div>
        <div className="rounded-xl border border-[#e5e5e5] bg-[#f7f7f7] p-3">
          <div className="grid gap-3 rounded-lg bg-white p-3">
            <div className="flex items-center gap-3">
              <AvatarBubble url={avatarAUrl} label="A" />
              <div className="rounded-2xl bg-[#f5f4f0] px-3 py-2 text-xs text-[#525252]">阿棠阿棠，我是小叮</div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="rounded-2xl bg-[#ffe2e2] px-3 py-2 text-right text-xs text-[#525252]">小叮小叮，阿棠收到！</div>
              <AvatarBubble url={avatarBUrl} label="B" />
            </div>
          </div>
        </div>
        <Field label="作品名称">
          <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={workName} onChange={(event) => setWorkName(event.target.value)} />
        </Field>
        <Field label="导出格式">
          <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={format} onChange={(event) => setFormat(event.target.value as ExportFormat)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WebP</option>
          </select>
        </Field>
        <Field label="质量" hint={`${Math.round(quality * 100)}%`}>
          <input className="range" max={1} min={0.6} step={0.01} type="range" value={quality} onChange={(event) => setQuality(Number(event.target.value))} />
        </Field>
        <div className="grid gap-2">
          <Button disabled={!sourceImage || isExporting} icon={<Download size={16} />} variant="primary" onClick={() => void exportAvatar(activeAvatar)}>
            导出当前头像
          </Button>
          <Button disabled={!sourceImage || isExporting} onClick={() => void exportAvatar(activeAvatar === 'a' ? 'b' : 'a')}>
            导出另一个头像
          </Button>
          <Button disabled={!sourceImage || isExporting} onClick={() => void exportZip()}>
            一键导出整套情头
          </Button>
        </div>
      </Panel>
    </div>
  )
}

function AvatarBubble({ url, label }: { url: string | null; label: string }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#eee] text-xs text-[#8a8a8a]">
      {url ? <img alt={`头像 ${label}`} className="h-full w-full object-cover" src={url} /> : label}
    </span>
  )
}
