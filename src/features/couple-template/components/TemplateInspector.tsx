import { Eye, EyeOff, RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import type { TemplateImageAdjustment } from '../types'

export function TemplateInspector() {
  const { workingTemplate, selectedElementId, updateElement, updateTemplate, resetTemplate } = useCoupleTemplateStore()
  const element = workingTemplate.elements.find((item) => item.id === selectedElementId)

  return (
    <div className="grid gap-4">
      <Field label="模板背景">
        <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={workingTemplate.backgroundColor} onChange={(event) => updateTemplate({ backgroundColor: event.target.value })} />
      </Field>
      <Button icon={<RotateCcw size={16} />} onClick={resetTemplate}>
        恢复模板默认设置
      </Button>

      {!element ? <p className="rounded-xl bg-[#fbfaf7] p-4 text-sm leading-6 text-[#737373]">点击画布上的文字、头像或色块后，在这里编辑属性。所有文字都可以手动输入修改。</p> : null}
      {element ? (
        <div className="grid gap-3 border-t border-[#eeeeee] pt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#171717]">{element.id}</p>
              <p className="text-xs text-[#8a8a8a]">{element.type}</p>
            </div>
            <Button icon={element.visible === false ? <EyeOff size={16} /> : <Eye size={16} />} onClick={() => updateElement(element.id, { visible: element.visible === false })}>
              {element.visible === false ? '显示' : '隐藏'}
            </Button>
          </div>
          <PositionFields id={element.id} x={element.x} y={element.y} width={element.width} height={element.height ?? (element.type === 'text' ? element.fontSize * 1.45 : 0)} />
          {element.type === 'text' ? (
            <>
              <Field label="文字内容">
                <textarea className="min-h-24 rounded-lg border border-[#e5e5e5] px-3 py-2" value={element.text} onChange={(event) => updateElement(element.id, { text: event.target.value })} />
              </Field>
              <Field label="字号" hint={`${element.fontSize}px`}>
                <input className="range" max={96} min={12} type="range" value={element.fontSize} onChange={(event) => updateElement(element.id, { fontSize: Number(event.target.value) })} />
              </Field>
              <Field label="字体风格">
                <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={element.fontFamily} onChange={(event) => updateElement(element.id, { fontFamily: event.target.value })}>
                  <option value={'"Great Vibes", "Parisienne", cursive'}>高级花体</option>
                  <option value={'"Parisienne", "Great Vibes", cursive'}>轻盈签名</option>
                  <option value={'"Dancing Script", "Trebuchet MS", cursive'}>自然手写</option>
                  <option value={'YouYuan, "Microsoft YaHei", sans-serif'}>圆润中文</option>
                  <option value={'"Arial Black", Impact, "Microsoft YaHei", sans-serif'}>酷黑标题</option>
                  <option value={'serif'}>复古衬线</option>
                  <option value={'sans-serif'}>简洁黑体</option>
                </select>
              </Field>
              <Field label="文字颜色">
                <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={element.color} onChange={(event) => updateElement(element.id, { color: event.target.value })} />
              </Field>
              <Field label="字距" hint={`${element.letterSpacing ?? 0}px`}>
                <input className="range" max={12} min={0} type="range" value={element.letterSpacing ?? 0} onChange={(event) => updateElement(element.id, { letterSpacing: Number(event.target.value) })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="描边颜色">
                  <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={element.strokeColor ?? '#ffffff'} onChange={(event) => updateElement(element.id, { strokeColor: event.target.value })} />
                </Field>
                <Field label="阴影颜色">
                  <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={normalizeColor(element.shadowColor) ?? '#171717'} onChange={(event) => updateElement(element.id, { shadowColor: event.target.value })} />
                </Field>
              </div>
              <Field label="描边宽度" hint={`${element.strokeWidth ?? 0}px`}>
                <input className="range" max={10} min={0} type="range" value={element.strokeWidth ?? 0} onChange={(event) => updateElement(element.id, { strokeWidth: Number(event.target.value) })} />
              </Field>
              <Field label="阴影强度" hint={`${element.shadowBlur ?? 0}px`}>
                <input className="range" max={24} min={0} type="range" value={element.shadowBlur ?? 0} onChange={(event) => updateElement(element.id, { shadowBlur: Number(event.target.value), shadowOffsetY: Number(event.target.value) > 0 ? (element.shadowOffsetY ?? 5) : 0 })} />
              </Field>
              <Field label="对齐">
                <select className="rounded-lg border border-[#e5e5e5] px-3 py-2" value={element.textAlign} onChange={(event) => updateElement(element.id, { textAlign: event.target.value as 'left' | 'center' | 'right' })}>
                  <option value="left">左对齐</option>
                  <option value="center">居中</option>
                  <option value="right">右对齐</option>
                </select>
              </Field>
            </>
          ) : null}
          {element.type === 'shape' ? (
            <>
              <Field label="填充颜色">
                <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={element.fill} onChange={(event) => updateElement(element.id, { fill: event.target.value })} />
              </Field>
              <Field label="圆角" hint={`${element.borderRadius ?? 0}px`}>
                <input className="range" max={100} min={0} type="range" value={element.borderRadius ?? 0} onChange={(event) => updateElement(element.id, { borderRadius: Number(event.target.value) })} />
              </Field>
              <Field label="卡片阴影" hint={`${element.shadowBlur ?? 0}px`}>
                <input className="range" max={80} min={0} type="range" value={element.shadowBlur ?? 0} onChange={(event) => updateElement(element.id, { shadowBlur: Number(event.target.value), shadowColor: element.shadowColor ?? 'rgba(0,0,0,0.16)', shadowOffsetY: Number(event.target.value) > 0 ? (element.shadowOffsetY ?? 10) : 0 })} />
              </Field>
            </>
          ) : null}
          {element.type === 'image' ? (
            <>
              <Field label="圆角" hint={`${element.borderRadius ?? 0}px`}>
                <input className="range" max={120} min={0} type="range" value={element.borderRadius ?? 0} onChange={(event) => updateElement(element.id, { borderRadius: Number(event.target.value), shape: element.shape === 'circle' ? 'rounded-rectangle' : element.shape })} />
              </Field>
              <Field label="边框宽度" hint={`${element.borderWidth ?? 0}px`}>
                <input className="range" max={20} min={0} type="range" value={element.borderWidth ?? 0} onChange={(event) => updateElement(element.id, { borderWidth: Number(event.target.value) })} />
              </Field>
              <Field label="边框颜色">
                <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={element.borderColor ?? '#ffffff'} onChange={(event) => updateElement(element.id, { borderColor: event.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="阴影颜色">
                  <input className="h-10 rounded-lg border border-[#e5e5e5] px-2" type="color" value={normalizeColor(element.shadowColor) ?? '#171717'} onChange={(event) => updateElement(element.id, { shadowColor: event.target.value })} />
                </Field>
                <Field label="阴影下移">
                  <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" type="number" value={element.shadowOffsetY ?? 0} onChange={(event) => updateElement(element.id, { shadowOffsetY: Number(event.target.value) })} />
                </Field>
              </div>
              <Field label="图片阴影" hint={`${element.shadowBlur ?? 0}px`}>
                <input className="range" max={80} min={0} type="range" value={element.shadowBlur ?? 0} onChange={(event) => updateElement(element.id, { shadowBlur: Number(event.target.value), shadowColor: element.shadowColor ?? 'rgba(0,0,0,0.25)' })} />
              </Field>
              <ImageAdjustmentFields id={element.id} adjustment={element.adjustment ?? { scale: 1, offsetX: 0, offsetY: 0, rotation: 0, flipX: false, flipY: false }} />
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function normalizeColor(color: string | undefined) {
  if (!color || color.startsWith('rgba')) return undefined
  return color
}

function PositionFields({ id, x, y, width, height }: { id: string; x: number; y: number; width: number; height: number }) {
  const updateElement = useCoupleTemplateStore((state) => state.updateElement)
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="X">
        <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" type="number" value={x} onChange={(event) => updateElement(id, { x: Number(event.target.value) })} />
      </Field>
      <Field label="Y">
        <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" type="number" value={y} onChange={(event) => updateElement(id, { y: Number(event.target.value) })} />
      </Field>
      <Field label="宽">
        <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" type="number" value={width} onChange={(event) => updateElement(id, { width: Number(event.target.value) })} />
      </Field>
      <Field label="高">
        <input className="rounded-lg border border-[#e5e5e5] px-3 py-2" type="number" value={height} onChange={(event) => updateElement(id, { height: Number(event.target.value) })} />
      </Field>
    </div>
  )
}

function ImageAdjustmentFields({ id, adjustment }: { id: string; adjustment: TemplateImageAdjustment }) {
  const updateElement = useCoupleTemplateStore((state) => state.updateElement)
  const patch = (next: Partial<TemplateImageAdjustment>) => updateElement(id, { adjustment: { ...adjustment, ...next } })
  return (
    <div className="grid gap-3 rounded-xl bg-[#fbfaf7] p-3">
      <Field label="图片内部缩放" hint={adjustment.scale.toFixed(2)}>
        <input className="range" max={2.5} min={0.5} step={0.01} type="range" value={adjustment.scale} onChange={(event) => patch({ scale: Number(event.target.value) })} />
      </Field>
      <Field label="内部 X 偏移" hint={`${adjustment.offsetX}px`}>
        <input className="range" max={200} min={-200} type="range" value={adjustment.offsetX} onChange={(event) => patch({ offsetX: Number(event.target.value) })} />
      </Field>
      <Field label="内部 Y 偏移" hint={`${adjustment.offsetY}px`}>
        <input className="range" max={200} min={-200} type="range" value={adjustment.offsetY} onChange={(event) => patch({ offsetY: Number(event.target.value) })} />
      </Field>
      <Field label="内部旋转" hint={`${adjustment.rotation}°`}>
        <input className="range" max={180} min={-180} type="range" value={adjustment.rotation} onChange={(event) => patch({ rotation: Number(event.target.value) })} />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Button variant={adjustment.flipX ? 'primary' : 'secondary'} onClick={() => patch({ flipX: !adjustment.flipX })}>
          水平翻转
        </Button>
        <Button variant={adjustment.flipY ? 'primary' : 'secondary'} onClick={() => patch({ flipY: !adjustment.flipY })}>
          垂直翻转
        </Button>
      </div>
    </div>
  )
}
