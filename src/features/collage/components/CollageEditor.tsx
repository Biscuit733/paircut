import { ArrowDown, ArrowUp, ChevronsDown, ChevronsUp, Download, FlipHorizontal, FlipVertical, GripVertical, LayoutGrid, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { Panel } from '../../../components/ui/Panel'
import type { ToastState } from '../../../components/ui/Toast'
import { resolveOutputSize } from '../../../utils/canvas'
import { downloadBlob, extensionForFormat } from '../../../utils/file'
import type { ExportFormat } from '../../cropper/types'
import { ImageUploader } from '../../uploader/components/ImageUploader'
import { useCollageStore } from '../store/useCollageStore'
import { collageTemplates, filterTemplatesByImageCount } from '../templates/templates'
import type { CollageImageState } from '../types'
import { recommendLayout } from '../utils/layoutScoring'
import { renderCollageToBlob } from '../utils/renderCollage'

export function CollageEditor({ setToast }: { setToast: (toast: ToastState) => void }) {
  const {
    images,
    templateId,
    imageStates,
    selectedSlotId,
    style,
    canvasSize,
    addImages,
    removeImage,
    clearImages,
    reverseImages,
    sortByName,
    moveImage,
    moveSelectedSlot,
    setTemplate,
    updateImageState,
    selectSlot,
    setCanvasSize,
    applyAssignments,
  } = useCollageStore()
  const [format, setFormat] = useState<ExportFormat>('png')
  const [quality, setQuality] = useState(0.92)
  const [isExporting, setIsExporting] = useState(false)
  const template = collageTemplates.find((item) => item.id === templateId) ?? collageTemplates[0]
  const availableTemplates = filterTemplatesByImageCount(collageTemplates, images.length)
  const output = resolveOutputSize(canvasSize, 1080, 1440, 3 / 4)
  const selectedState = imageStates.find((state) => state.slotId === selectedSlotId) ?? null
  const selectedImage = images.find((image) => image.id === selectedState?.imageId) ?? null

  const smartLayout = () => {
    if (images.length < 2) return
    const result = recommendLayout(images, output.width / output.height, collageTemplates)
    applyAssignments(result.templateId, result.assignments)
    setToast({ type: 'info', message: `已选择 ${collageTemplates.find((item) => item.id === result.templateId)?.name ?? '智能模板'}，评分 ${Math.round(result.score)}。` })
  }

  const exportCollage = async () => {
    if (images.length < 2) return
    setIsExporting(true)
    try {
      const blob = await renderCollageToBlob({ images, template, states: imageStates, style, width: output.width, height: output.height, format, quality })
      downloadBlob(blob, `biscuit-collage.${extensionForFormat(format)}`)
      setToast({ type: 'success', message: `拼图已导出：${output.width} x ${output.height}` })
    } catch (caught) {
      setToast({ type: 'error', message: caught instanceof Error ? caught.message : '拼图导出失败。' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-116px)] lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:overflow-hidden">
      <Panel className="grid content-start gap-4 lg:h-full lg:min-h-0 lg:overflow-auto">
        <ImageUploader multiple description="一次上传 2 到 20 张图片，支持继续添加、排序和删除。" label="上传拼图图片" onImages={addImages} />
        <div className="flex flex-wrap gap-2">
          <Button disabled={images.length < 2} onClick={reverseImages}>
            一键倒序
          </Button>
          <Button disabled={images.length < 2} onClick={sortByName}>
            按文件名排序
          </Button>
          <Button disabled={images.length === 0} variant="danger" onClick={() => window.confirm('确定清空全部图片？') && clearImages()}>
            清空全部
          </Button>
        </div>
        <div className="grid gap-2">
          {images.map((image, index) => {
            const state = imageStates.find((item) => item.imageId === image.id)
            const isSelected = state?.slotId === selectedSlotId
            return (
            <div
              key={image.id}
              className={`grid cursor-grab gap-2 rounded-lg border p-2 transition active:cursor-grabbing ${
                isSelected ? 'border-[#ff5f6d] bg-white shadow-[0_10px_24px_rgba(255,95,109,0.12)] ring-1 ring-[#ff5f6d]/25' : 'border-white/80 bg-white/72 hover:bg-white'
              }`}
              draggable
              onClick={() => state && selectSlot(state.slotId)}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={(event) => {
                event.dataTransfer.setData('text/plain', `image:${image.id}`)
                event.dataTransfer.effectAllowed = 'move'
              }}
              onDrop={(event) => {
                event.preventDefault()
                const payload = event.dataTransfer.getData('text/plain')
                const sourceImageId = payload.startsWith('slot:')
                  ? imageStates.find((item) => item.slotId === payload.replace('slot:', ''))?.imageId
                  : payload.replace('image:', '')
                if (sourceImageId) moveImage(sourceImageId, index)
              }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <GripVertical className="shrink-0 text-[#a0a0a5]" size={16} />
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#f1f0ec] text-xs font-semibold text-[#7a7a80]">{index + 1}</span>
                <img alt={image.name} className="h-12 w-12 shrink-0 rounded-md object-cover" src={image.previewUrl} />
                <span className="min-w-0 flex-1 truncate text-xs">{image.name}</span>
                <Button aria-label="删除图片" className="shrink-0" icon={<Trash2 size={15} />} variant="ghost" onClick={(event) => { event.stopPropagation(); if (window.confirm('确定删除这张图片？')) removeImage(image.id) }} />
              </div>
              <div className="grid grid-cols-4 gap-1">
                <Button aria-label="置顶" disabled={index === 0} icon={<ChevronsUp size={14} />} variant="ghost" onClick={(event) => { event.stopPropagation(); moveImage(image.id, 0) }} />
                <Button aria-label="上移" disabled={index === 0} icon={<ArrowUp size={14} />} variant="ghost" onClick={(event) => { event.stopPropagation(); moveImage(image.id, index - 1) }} />
                <Button aria-label="下移" disabled={index === images.length - 1} icon={<ArrowDown size={14} />} variant="ghost" onClick={(event) => { event.stopPropagation(); moveImage(image.id, index + 1) }} />
                <Button aria-label="置底" disabled={index === images.length - 1} icon={<ChevronsDown size={14} />} variant="ghost" onClick={(event) => { event.stopPropagation(); moveImage(image.id, images.length - 1) }} />
              </div>
            </div>
            )
          })}
        </div>
      </Panel>

      <main className="grid content-start gap-4 lg:h-full lg:min-h-0 lg:overflow-auto">
        <div className="grid gap-3 rounded-lg border border-white/78 bg-white/72 p-3 shadow-[0_16px_44px_rgba(24,24,27,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
          <Button disabled={images.length < 2} icon={<LayoutGrid size={16} />} variant="primary" onClick={smartLayout}>
            智能布局
          </Button>
          <Button disabled={!selectedSlotId} icon={<ArrowUp size={16} />} onClick={() => moveSelectedSlot(-1)}>
            前移一格
          </Button>
          <Button disabled={!selectedSlotId} icon={<ArrowDown size={16} />} onClick={() => moveSelectedSlot(1)}>
            后移一格
          </Button>
          </div>
          <div className="flex max-h-28 flex-wrap gap-2 overflow-auto pr-1">
          {availableTemplates.map((item) => (
            <Button key={item.id} variant={templateId === item.id ? 'primary' : 'secondary'} onClick={() => setTemplate(item.id)}>
              {item.name}
            </Button>
          ))}
          </div>
        </div>
        {images.length >= 2 ? <CollageCanvas imageStates={imageStates} output={output} /> : <Panel className="grid min-h-[520px] place-items-center text-center text-[#737373]">至少上传 2 张图片后开始拼图。</Panel>}
      </main>

      <Panel className="grid content-start gap-4 lg:h-full lg:min-h-0 lg:overflow-auto">
        <Field label="画布尺寸">
          <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={canvasSize} onChange={(event) => setCanvasSize(event.target.value)}>
            <option value="1080x1080">1080 x 1080</option>
            <option value="1080x1440">1080 x 1440</option>
            <option value="1440x1080">1440 x 1080</option>
            <option value="1080x1920">1080 x 1920</option>
            <option value="1920x1080">1920 x 1080</option>
            <option value="2048x2048">2048 x 2048</option>
          </select>
        </Field>
        <StyleControls />
        {selectedState ? (
          <>
            <div className="grid gap-2 rounded-lg border border-white/72 bg-white/52 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <p className="truncate text-sm font-semibold text-[#171717]">{selectedImage?.name ?? '已选图片'}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button icon={<ArrowUp size={16} />} onClick={() => moveSelectedSlot(-1)}>
                  前移一格
                </Button>
                <Button icon={<ArrowDown size={16} />} onClick={() => moveSelectedSlot(1)}>
                  后移一格
                </Button>
              </div>
            </div>
            <SlotControls state={selectedState} onChange={(patch) => updateImageState(selectedState.slotId, patch)} />
          </>
        ) : <p className="rounded-lg border border-white/70 bg-white/52 p-3 text-sm text-[#737373]">点击拼图中的图片后，可独立调整位置、缩放、旋转和翻转，也可以拖拽图片到别的位置交换。</p>}
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
        <Button disabled={images.length < 2 || isExporting} icon={<Download size={16} />} variant="primary" onClick={() => void exportCollage()}>
          导出拼图
        </Button>
      </Panel>
    </div>
  )
}

function CollageCanvas({ imageStates, output }: { imageStates: CollageImageState[]; output: { width: number; height: number } }) {
  const { images, templateId, style, selectedSlotId, selectSlot, swapSlots, assignImageToSlot } = useCollageStore()
  const template = collageTemplates.find((item) => item.id === templateId) ?? collageTemplates[0]
  const slotMap = useMemo(() => new Map(imageStates.map((state) => [state.slotId, state])), [imageStates])
  return (
    <div className="grid place-items-center overflow-auto rounded-lg bg-[#1d1d1f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div
        className="relative h-[min(72vh,760px)] max-h-[760px] max-w-full overflow-hidden"
        style={{ aspectRatio: `${output.width} / ${output.height}`, backgroundColor: style.backgroundColor, padding: style.padding / 3 }}
      >
        {template.slots.slice(0, images.length).map((slot) => {
          const state = slotMap.get(slot.id)
          const image = images.find((item) => item.id === state?.imageId)
          if (!state || !image) return null
          const isCircle = template.id === 'two-double-circle'
          return (
            <button
              key={slot.id}
              className={`absolute overflow-hidden border bg-[#eee] transition ${selectedSlotId === slot.id ? 'outline outline-2 outline-[#ff5f6d] outline-offset-2' : ''}`}
              draggable
              style={{
                left: `${slot.x * 100}%`,
                top: `${slot.y * 100}%`,
                borderRadius: isCircle ? '999px' : style.radius,
                borderColor: style.borderColor,
                borderWidth: style.borderWidth,
                transform: `translate(${style.gap / 6}px, ${style.gap / 6}px)`,
                width: `calc(${slot.width * 100}% - ${style.gap / 3}px)`,
                height: `calc(${slot.height * 100}% - ${style.gap / 3}px)`,
                boxShadow: style.shadow ? `0 12px ${style.shadowBlur}px rgba(0,0,0,${style.shadowOpacity})` : undefined,
              }}
              type="button"
              onClick={() => selectSlot(slot.id)}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={(event) => {
                event.dataTransfer.setData('text/plain', `slot:${slot.id}`)
                event.dataTransfer.effectAllowed = 'move'
              }}
              onDrop={(event) => {
                event.preventDefault()
                const payload = event.dataTransfer.getData('text/plain')
                if (payload.startsWith('slot:')) swapSlots(payload.replace('slot:', ''), slot.id)
                if (payload.startsWith('image:')) assignImageToSlot(payload.replace('image:', ''), slot.id)
              }}
            >
              <img
                alt={image.name}
                className="h-full w-full object-cover"
                src={image.previewUrl}
                style={{
                  transform: `translate(${state.offsetX / 4}px, ${state.offsetY / 4}px) scale(${state.scale}) rotate(${state.rotation}deg) scaleX(${state.flipX ? -1 : 1}) scaleY(${state.flipY ? -1 : 1})`,
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StyleControls() {
  const { style, updateStyle } = useCollageStore()
  return (
    <div className="grid gap-3">
      <Field label="图片间距" hint={`${style.gap}px`}>
        <input className="range" max={80} min={0} type="range" value={style.gap} onChange={(event) => updateStyle({ gap: Number(event.target.value) })} />
      </Field>
      <Field label="外边距" hint={`${style.padding}px`}>
        <input className="range" max={120} min={0} type="range" value={style.padding} onChange={(event) => updateStyle({ padding: Number(event.target.value) })} />
      </Field>
      <Field label="圆角" hint={`${style.radius}px`}>
        <input className="range" max={100} min={0} type="range" value={style.radius} onChange={(event) => updateStyle({ radius: Number(event.target.value) })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="背景">
          <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={style.backgroundColor} onChange={(event) => updateStyle({ backgroundColor: event.target.value })} />
        </Field>
        <Field label="边框">
          <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={style.borderColor} onChange={(event) => updateStyle({ borderColor: event.target.value })} />
        </Field>
      </div>
      <Field label="边框宽度" hint={`${style.borderWidth}px`}>
        <input className="range" max={12} min={0} type="range" value={style.borderWidth} onChange={(event) => updateStyle({ borderWidth: Number(event.target.value) })} />
      </Field>
      <Button variant={style.shadow ? 'primary' : 'secondary'} onClick={() => updateStyle({ shadow: !style.shadow })}>
        阴影开关
      </Button>
    </div>
  )
}

function SlotControls({ state, onChange }: { state: CollageImageState; onChange: (patch: Partial<CollageImageState>) => void }) {
  return (
    <div className="grid gap-3 rounded-xl bg-[#fbfaf7] p-3">
      <Field label="缩放" hint={state.scale.toFixed(2)}>
        <input className="range" max={3} min={0.6} step={0.01} type="range" value={state.scale} onChange={(event) => onChange({ scale: Number(event.target.value) })} />
      </Field>
      <Field label="X 偏移" hint={`${state.offsetX}px`}>
        <input className="range" max={300} min={-300} type="range" value={state.offsetX} onChange={(event) => onChange({ offsetX: Number(event.target.value) })} />
      </Field>
      <Field label="Y 偏移" hint={`${state.offsetY}px`}>
        <input className="range" max={300} min={-300} type="range" value={state.offsetY} onChange={(event) => onChange({ offsetY: Number(event.target.value) })} />
      </Field>
      <Field label="旋转" hint={`${state.rotation}°`}>
        <input className="range" max={180} min={-180} type="range" value={state.rotation} onChange={(event) => onChange({ rotation: Number(event.target.value) })} />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Button icon={<FlipHorizontal size={16} />} variant={state.flipX ? 'primary' : 'secondary'} onClick={() => onChange({ flipX: !state.flipX })}>
          水平
        </Button>
        <Button icon={<FlipVertical size={16} />} variant={state.flipY ? 'primary' : 'secondary'} onClick={() => onChange({ flipY: !state.flipY })}>
          垂直
        </Button>
      </div>
    </div>
  )
}
