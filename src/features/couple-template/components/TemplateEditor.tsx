import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Panel } from '../../../components/ui/Panel'
import { Button } from '../../../components/ui/Button'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import { renderCroppedDataUrl } from '../../cropper/utils/cropImage'
import type { CropConfig } from '../../cropper/types'
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
  const [avatarPreviewUrls, setAvatarPreviewUrls] = useState<{
    avatarACircle: string
    avatarASquare: string
    avatarBCircle: string
    avatarBSquare: string
  } | null>(null)
  const canUseTemplate = Boolean(sourceImage)

  useEffect(() => {
    let cancelled = false
    if (!sourceImage) {
      setAvatarPreviewUrls(null)
      return
    }
    void Promise.all([
      renderCroppedDataUrl(sourceImage, makeAvatarVariant(avatarA, 'circle')),
      renderCroppedDataUrl(sourceImage, makeAvatarVariant(avatarA, 'square')),
      renderCroppedDataUrl(sourceImage, makeAvatarVariant(avatarB, 'circle')),
      renderCroppedDataUrl(sourceImage, makeAvatarVariant(avatarB, 'square')),
    ]).then(([avatarACircle, avatarASquare, avatarBCircle, avatarBSquare]) => {
      if (!cancelled) {
        setAvatarPreviewUrls({ avatarACircle, avatarASquare, avatarBCircle, avatarBSquare })
      }
    })
    return () => {
      cancelled = true
    }
  }, [sourceImage, avatarA, avatarB])

  const sourceUrls = useMemo(
    () => ({
      original: sourceImage?.previewUrl ?? null,
      avatarACircle: avatarPreviewUrls?.avatarACircle ?? null,
      avatarASquare: avatarPreviewUrls?.avatarASquare ?? null,
      avatarBCircle: avatarPreviewUrls?.avatarBCircle ?? null,
      avatarBSquare: avatarPreviewUrls?.avatarBSquare ?? null,
    }),
    [sourceImage?.previewUrl, avatarPreviewUrls],
  )

  if (!canUseTemplate) {
    return (
      <Panel className="grid min-h-[520px] place-items-center text-center">
        <div className="max-w-md">
          <p className="text-xl font-semibold text-[#171717]">请先上传一张原图</p>
          <p className="mt-3 text-sm leading-6 text-[#737373]">头像模板会读取原始图片和 A/B 默认裁剪位置，导出时重新高清渲染，不使用低清截图。</p>
          <Button className="mt-5" icon={<ArrowLeft size={16} />} variant="primary" onClick={onBack}>
            返回头像裁剪
          </Button>
        </div>
      </Panel>
    )
  }

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-116px)] lg:grid-rows-[auto_minmax(0,1fr)] lg:overflow-hidden">
      <TemplateToolbar onBack={onBack} setToast={setToast} />
      <div className="grid min-h-0 items-start gap-4 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <Panel className="xl:h-full xl:min-h-0 xl:overflow-auto">
          <TemplateGallery sourceUrls={sourceUrls} />
        </Panel>
        <TemplateCanvas sourceUrls={sourceUrls} template={workingTemplate} />
        <Panel className="xl:h-full xl:min-h-0 xl:overflow-auto">
          <TemplateInspector />
        </Panel>
      </div>
    </div>
  )
}

function makeAvatarVariant(config: CropConfig, shape: 'circle' | 'square'): CropConfig {
  return {
    ...config,
    shape,
    aspectRatio: 1,
    outputWidth: 800,
    outputHeight: 800,
  }
}
