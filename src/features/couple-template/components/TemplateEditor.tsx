import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Panel } from '../../../components/ui/Panel'
import { Button } from '../../../components/ui/Button'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import { renderCroppedDataUrl } from '../../cropper/utils/cropImage'
import { TemplateGallery } from './TemplateGallery'
import { TemplateCanvas } from './TemplateCanvas'
import { TemplateInspector } from './TemplateInspector'
import { TemplateToolbar } from './TemplateToolbar'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'

type TemplateEditorProps = {
  onBack: () => void
  setToast: (toast: ToastState) => void
}

export function TemplateEditor({ onBack, setToast }: TemplateEditorProps) {
  const { sourceImage, avatarA, avatarB } = useCoupleStore()
  const workingTemplate = useCoupleTemplateStore((state) => state.workingTemplate)
  const [avatarAUrl, setAvatarAUrl] = useState<string | null>(null)
  const [avatarBUrl, setAvatarBUrl] = useState<string | null>(null)
  const canUseTemplate = Boolean(sourceImage && avatarA.croppedAreaPixels && avatarB.croppedAreaPixels)

  useEffect(() => {
    let cancelled = false
    if (!sourceImage || !avatarA.croppedAreaPixels || !avatarB.croppedAreaPixels) {
      setAvatarAUrl(null)
      setAvatarBUrl(null)
      return
    }
    void Promise.all([renderCroppedDataUrl(sourceImage, avatarA), renderCroppedDataUrl(sourceImage, avatarB)]).then(([a, b]) => {
      if (!cancelled) {
        setAvatarAUrl(a)
        setAvatarBUrl(b)
      }
    })
    return () => {
      cancelled = true
    }
  }, [sourceImage, avatarA, avatarB])

  const sourceUrls = useMemo(
    () => ({
      original: sourceImage?.previewUrl ?? null,
      avatarA: avatarAUrl,
      avatarB: avatarBUrl,
    }),
    [sourceImage?.previewUrl, avatarAUrl, avatarBUrl],
  )

  if (!canUseTemplate) {
    return (
      <Panel className="grid min-h-[520px] place-items-center text-center">
        <div className="max-w-md">
          <p className="text-xl font-semibold text-[#171717]">请先完成头像 A 和头像 B 的裁剪</p>
          <p className="mt-3 text-sm leading-6 text-[#737373]">情头模板会直接读取原始图片和 A/B 裁剪参数，导出时重新高清渲染，不使用低清截图。</p>
          <Button className="mt-5" icon={<ArrowLeft size={16} />} variant="primary" onClick={onBack}>
            返回情头裁剪
          </Button>
        </div>
      </Panel>
    )
  }

  return (
    <div className="grid gap-4">
      <TemplateToolbar onBack={onBack} setToast={setToast} />
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <Panel className="max-h-[calc(100vh-170px)] overflow-auto">
          <TemplateGallery />
        </Panel>
        <TemplateCanvas sourceUrls={sourceUrls} template={workingTemplate} />
        <Panel className="max-h-[calc(100vh-170px)] overflow-auto">
          <TemplateInspector />
        </Panel>
      </div>
    </div>
  )
}

