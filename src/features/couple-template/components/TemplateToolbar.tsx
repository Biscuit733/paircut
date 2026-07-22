import { ChevronDown, Download, Eye, EyeOff, Package, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import { resolveOutputSize } from '../../../utils/canvas'
import { downloadBlob, extensionForFormat, sanitizeFileName } from '../../../utils/file'
import { renderTemplateToBlob } from '../utils/renderTemplate'
import type { ExportFormat } from '../../cropper/types'
import { useState, type ReactNode } from 'react'
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
      <ToolbarSelect label="尺寸">
        <select className="h-10 min-w-[112px] appearance-none bg-white py-0 pl-3 pr-9 text-sm font-medium text-[#171717] outline-none" value={exportSize} onChange={(event) => setExportSize(event.target.value)}>
          {exportSizes.map((size) => (
            <option key={size} value={size}>
              {size === 'custom' ? '自定义宽度' : exportSizeLabels[size]}
            </option>
          ))}
        </select>
      </ToolbarSelect>
      {exportSize === 'custom' ? (
        <ToolbarInput label="宽度" hint={`${output.height}px 高`}>
          <input className="h-10 w-24 bg-white px-3 text-sm font-medium text-[#171717] outline-none" min={360} type="number" value={customWidth} onChange={(event) => setCustomWidth(Number(event.target.value))} />
        </ToolbarInput>
      ) : null}
      <ToolbarSelect label="格式">
        <select className="h-10 min-w-[86px] appearance-none bg-white py-0 pl-3 pr-9 text-sm font-medium text-[#171717] outline-none" value={format} onChange={(event) => setFormat(event.target.value as ExportFormat)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
          <option value="webp">WebP</option>
        </select>
      </ToolbarSelect>
      <Button disabled={!sourceImage || isExporting} icon={<Download size={16} />} variant="primary" onClick={() => void exportTemplate()}>
        导出模板图
      </Button>
      <Button disabled={!sourceImage || isExporting} icon={<Package size={16} />} onClick={() => void exportTemplateSet()}>
        导出套装
      </Button>
    </div>
  )
}

function ToolbarSelect({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="group inline-flex h-10 overflow-hidden rounded-lg border border-[#dedede] bg-white shadow-sm transition focus-within:border-[#171717] focus-within:ring-2 focus-within:ring-[#171717]/10">
      <span className="grid min-w-12 place-items-center border-r border-[#eeeeee] bg-[#fbfaf7] px-3 text-xs font-semibold text-[#737373]">{label}</span>
      <span className="relative inline-flex items-center">
        {children}
        <ChevronDown className="pointer-events-none absolute right-3 text-[#8a8a8a] transition group-focus-within:text-[#171717]" size={15} />
      </span>
    </label>
  )
}

function ToolbarInput({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
  return (
    <label className="inline-flex h-10 overflow-hidden rounded-lg border border-[#dedede] bg-white shadow-sm transition focus-within:border-[#171717] focus-within:ring-2 focus-within:ring-[#171717]/10">
      <span className="grid min-w-12 place-items-center border-r border-[#eeeeee] bg-[#fbfaf7] px-3 text-xs font-semibold text-[#737373]">{label}</span>
      {children}
      <span className="grid place-items-center border-l border-[#eeeeee] bg-[#fbfaf7] px-3 text-xs text-[#8a8a8a]">{hint}</span>
    </label>
  )
}
