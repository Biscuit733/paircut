import { useCallback } from 'react'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import {
  FlipHorizontal,
  FlipVertical,
  Grid3X3,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import type { CropConfig, CropShape } from '../types'
import type { ImageAsset } from '../../uploader/types'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'

type CropEditorProps = {
  asset: ImageAsset
  config: CropConfig
  onChange: (patch: Partial<CropConfig>) => void
  guide: 'grid' | 'cross' | 'safe' | 'none'
  onGuideChange: (guide: 'grid' | 'cross' | 'safe' | 'none') => void
}

const shapeOptions: Array<{ label: string; value: CropShape; ratio: number | null }> = [
  { label: '圆形', value: 'circle', ratio: 1 },
  { label: '正方形', value: 'square', ratio: 1 },
  { label: '长方形 4:3', value: 'rectangle', ratio: 4 / 3 },
  { label: '长方形 3:4', value: 'rectangle', ratio: 3 / 4 },
  { label: '自由比例', value: 'free', ratio: null },
]

export function CropEditor({ asset, config, onChange, guide, onGuideChange }: CropEditorProps) {
  const onCropComplete = useCallback(
    (_area: Area, croppedAreaPixels: Area) => {
      onChange({ croppedAreaPixels })
    },
    [onChange],
  )

  const nudge = (x: number, y: number) => {
    onChange({ crop: { x: config.crop.x + x, y: config.crop.y + y } })
  }

  return (
    <div className="grid gap-4">
      <div
        className="cropper-frame relative h-[460px] overflow-hidden rounded-xl bg-[#202020] outline-none"
        onKeyDown={(event) => {
          const step = event.shiftKey ? 10 : 1
          if (event.key === 'ArrowLeft') nudge(-step, 0)
          if (event.key === 'ArrowRight') nudge(step, 0)
          if (event.key === 'ArrowUp') nudge(0, -step)
          if (event.key === 'ArrowDown') nudge(0, step)
        }}
        tabIndex={0}
      >
        <Cropper
          aspect={config.aspectRatio ?? undefined}
          crop={config.crop}
          cropShape={config.shape === 'circle' ? 'round' : 'rect'}
          image={asset.objectUrl}
          rotation={config.rotation}
          showGrid={guide === 'grid'}
          zoom={config.zoom}
          onCropChange={(crop: Point) => onChange({ crop })}
          onCropComplete={onCropComplete}
          onRotationChange={(rotation) => onChange({ rotation })}
          onZoomChange={(zoom) => onChange({ zoom })}
        />
        {guide === 'cross' ? <CrossGuide /> : null}
        {guide === 'safe' ? <SafeGuide /> : null}
      </div>

      <div className="grid gap-4 rounded-xl border border-[#e5e5e5] bg-white p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {shapeOptions.map((item) => (
            <Button
              key={`${item.label}-${item.ratio}`}
              variant={config.shape === item.value && config.aspectRatio === item.ratio ? 'primary' : 'secondary'}
              onClick={() => onChange({ shape: item.value, aspectRatio: item.ratio })}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="缩放" hint={config.zoom.toFixed(2)}>
            <input
              className="range"
              max={4}
              min={1}
              step={0.01}
              type="range"
              value={config.zoom}
              onChange={(event) => onChange({ zoom: Number(event.target.value) })}
            />
          </Field>
          <Field label="旋转" hint={`${Math.round(config.rotation)}°`}>
            <input
              className="range"
              max={180}
              min={-180}
              step={1}
              type="range"
              value={config.rotation}
              onChange={(event) => onChange({ rotation: Number(event.target.value) })}
            />
          </Field>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={<RotateCcw size={16} />} onClick={() => onChange({ rotation: config.rotation - 90 })}>
            左转 90°
          </Button>
          <Button icon={<RotateCw size={16} />} onClick={() => onChange({ rotation: config.rotation + 90 })}>
            右转 90°
          </Button>
          <Button icon={<FlipHorizontal size={16} />} onClick={() => onChange({ flipX: !config.flipX })}>
            水平翻转
          </Button>
          <Button icon={<FlipVertical size={16} />} onClick={() => onChange({ flipY: !config.flipY })}>
            垂直翻转
          </Button>
          <Button icon={<ZoomIn size={16} />} onClick={() => onChange({ zoom: Math.min(4, config.zoom + 0.1) })}>
            放大
          </Button>
          <Button icon={<ZoomOut size={16} />} onClick={() => onChange({ zoom: Math.max(1, config.zoom - 0.1) })}>
            缩小
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="输出宽度">
            <input
              className="rounded-lg border border-[#e5e5e5] px-3 py-2"
              min={64}
              type="number"
              value={config.outputWidth}
              onChange={(event) => onChange({ outputWidth: Number(event.target.value) })}
            />
          </Field>
          <Field label="输出高度">
            <input
              className="rounded-lg border border-[#e5e5e5] px-3 py-2"
              min={64}
              type="number"
              value={config.outputHeight}
              onChange={(event) => onChange({ outputHeight: Number(event.target.value) })}
            />
          </Field>
          <Field label="JPG 背景色">
            <input
              className="h-10 rounded-lg border border-[#e5e5e5] px-2"
              type="color"
              value={config.backgroundColor}
              onChange={(event) => onChange({ backgroundColor: event.target.value })}
            />
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button icon={<Grid3X3 size={16} />} variant={guide === 'grid' ? 'primary' : 'secondary'} onClick={() => onGuideChange('grid')}>
            九宫格
          </Button>
          <Button variant={guide === 'cross' ? 'primary' : 'secondary'} onClick={() => onGuideChange('cross')}>
            中心线
          </Button>
          <Button variant={guide === 'safe' ? 'primary' : 'secondary'} onClick={() => onGuideChange('safe')}>
            安全区
          </Button>
          <Button variant={guide === 'none' ? 'primary' : 'secondary'} onClick={() => onGuideChange('none')}>
            无辅助线
          </Button>
          <span className="text-xs text-[#8a8a8a]">方向键微调 1px，Shift + 方向键微调 10px。</span>
        </div>
      </div>
    </div>
  )
}

function CrossGuide() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/50" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/50" />
    </div>
  )
}

function SafeGuide() {
  return <div className="pointer-events-none absolute inset-[12%] rounded-xl border border-dashed border-white/60" />
}
