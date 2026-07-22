import { Download, Eye, EyeOff, Package, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import { resolveOutputSize } from '../../../utils/canvas'
import { downloadBlob, extensionForFormat, sanitizeFileName } from '../../../utils/file'
import { renderTemplateToBlob } from '../utils/renderTemplate'
import type { ExportFormat } from '../../cropper/types'
import { useState } from 'react'
import { exportCoupleZip } from '../../export/exportZip'

type TemplateToolbarProps = {
  onBack: () => void
  setToast: (toast: ToastState) => void
}

const exportSizes = ['1080x1200', '1242x1660', '1440x1920', '2160x2880', 'custom']

const exportSizeLabels: Record<string, string> = {
  '1080x1200': '1080 宽',
  '1242x1660': '1242 宽',
  '1440x1920': '1440 宽',
  '2160x2880': '2160 宽',
}

export function TemplateToolbar({ onBack, setToast }: TemplateToolbarProps) {
  const { workingTemplate, canvasZoom, setCanvasZoom, exportSize, setExportSize, customWidth, setCustomWidth, undo, redo, undoStack, redoStack } = useCoupleTemplateStore()
  const updateTemplate = useCoupleTemplateStore((state) => state.updateTemplate)
  const { sourceImage, avatarA, avatarB } = useCoupleStore()
  const [format, setFormat] = useState<ExportFormat>('png')
  const [isExporting, setIsExporting] = useState(false)
  const ratio = workingTemplate.canvasWidth / workingTemplate.canvasHeight
  const presetOutput = resolveOutputSize(exportSize, 1080, 1440, ratio)
  const output =
    exportSize === 'custom'
      ? { width: customWidth, height: Math.round(customWidth / ratio) }
      : { width: presetOutput.width, height: Math.round(presetOutput.width / ratio) }
  const watermarkElements = workingTemplate.elements.filter((element) => element.type === 'text' && element.id.toLowerCase().includes('watermark'))
  const hasWatermark = watermarkElements.length > 0
  const isWatermarkVisible = watermarkElements.some((element) => element.visible !== false)

  const toggleWatermark = () => {
    updateTemplate({
      elements: workingTemplate.elements.map((element) =>
        element.type === 'text' && element.id.toLowerCase().includes('watermark')
          ? { ...element, visible: !isWatermarkVisible }
          : element,
      ),
    })
  }

  const exportTemplate = async () => {
    if (!sourceImage) return
    setIsExporting(true)
    try {
      const blob = await renderTemplateToBlob(
        workingTemplate,
        { original: sourceImage, avatarA, avatarB },
        { format, quality: 0.94, width: output.width, height: output.height },
      )
      downloadBlob(blob, `${sanitizeFileName(workingTemplate.name)}.${extensionForFormat(format)}`)
      setToast({ type: 'success', message: `模板图已导出：${output.width} x ${output.height}` })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : '模板导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  const exportTemplateSet = async () => {
    if (!sourceImage) return
    setIsExporting(true)
    try {
      const blob = await exportCoupleZip({
        sourceImage,
        avatarA,
        avatarB,
        workName: workingTemplate.name,
        format,
        quality: 0.94,
        template: workingTemplate,
        templateOutput: output,
      })
      downloadBlob(blob, `${sanitizeFileName(workingTemplate.name)}-套装.zip`)
      setToast({ type: 'success', message: '套装已导出：原图、模板图、圆形/方形头像都在 ZIP 里。' })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : '套装导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white p-3">
      <Button onClick={onBack}>返回裁剪</Button>
      <Button disabled={undoStack.length === 0} icon={<Undo2 size={16} />} onClick={undo}>
        撤销
      </Button>
      <Button disabled={redoStack.length === 0} icon={<Redo2 size={16} />} onClick={redo}>
        重做
      </Button>
      <Button icon={<ZoomOut size={16} />} onClick={() => setCanvasZoom(Math.max(0.28, canvasZoom - 0.06))}>
        缩小
      </Button>
      <Button icon={<ZoomIn size={16} />} onClick={() => setCanvasZoom(Math.min(0.75, canvasZoom + 0.06))}>
        放大 {Math.round(canvasZoom * 100)}%
      </Button>
      {hasWatermark ? (
        <Button icon={isWatermarkVisible ? <EyeOff size={16} /> : <Eye size={16} />} onClick={toggleWatermark}>
          {isWatermarkVisible ? '隐藏水印' : '显示水印'}
        </Button>
      ) : null}
      <Field label="尺寸">
        <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={exportSize} onChange={(event) => setExportSize(event.target.value)}>
          {exportSizes.map((size) => (
            <option key={size} value={size}>
              {size === 'custom' ? '自定义宽度' : exportSizeLabels[size]}
            </option>
          ))}
        </select>
      </Field>
      {exportSize === 'custom' ? (
        <Field label="自定义宽度" hint={`${output.height}px 高`}>
          <input className="w-28 rounded-lg border border-[#e5e5e5] px-3 py-2" min={360} type="number" value={customWidth} onChange={(event) => setCustomWidth(Number(event.target.value))} />
        </Field>
      ) : null}
      <Field label="格式">
        <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={format} onChange={(event) => setFormat(event.target.value as ExportFormat)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
          <option value="webp">WebP</option>
        </select>
      </Field>
      <Button disabled={!sourceImage || isExporting} icon={<Download size={16} />} variant="primary" onClick={() => void exportTemplate()}>
        导出模板图
      </Button>
      <Button disabled={!sourceImage || isExporting} icon={<Package size={16} />} onClick={() => void exportTemplateSet()}>
        导出套装
      </Button>
    </div>
  )
}
