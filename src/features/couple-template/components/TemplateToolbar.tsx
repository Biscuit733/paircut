import { Download, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react'
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

type TemplateToolbarProps = {
  onBack: () => void
  setToast: (toast: ToastState) => void
}

const exportSizes = ['1080x1440', '1242x1660', '1440x1920', '2160x2880', 'custom']

export function TemplateToolbar({ onBack, setToast }: TemplateToolbarProps) {
  const { workingTemplate, canvasZoom, setCanvasZoom, exportSize, setExportSize, customWidth, setCustomWidth, undo, redo, undoStack, redoStack } = useCoupleTemplateStore()
  const { sourceImage, avatarA, avatarB } = useCoupleStore()
  const [format, setFormat] = useState<ExportFormat>('png')
  const [isExporting, setIsExporting] = useState(false)
  const ratio = workingTemplate.canvasWidth / workingTemplate.canvasHeight
  const output = exportSize === 'custom' ? { width: customWidth, height: Math.round(customWidth / ratio) } : resolveOutputSize(exportSize, 1080, 1440, ratio)

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
      <Field label="尺寸">
        <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={exportSize} onChange={(event) => setExportSize(event.target.value)}>
          {exportSizes.map((size) => (
            <option key={size} value={size}>
              {size === 'custom' ? '自定义比例尺寸' : size}
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
    </div>
  )
}
