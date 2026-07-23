import { useMemo, useRef, useState } from 'react'
import type {
  CouplePosterTemplate,
  CoupleTemplateElement,
  TemplateImageAdjustment,
  TemplateImageElement,
  TemplateShapeElement,
  TemplateTextElement,
} from '../types'
import { sortedElements } from '../utils/scaleTemplate'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'

type TemplateCanvasProps = {
  template: CouplePosterTemplate
  sourceUrls: TemplateCanvasSourceUrls
}

type TemplateCanvasSourceUrls = Record<'original' | 'avatarACircle' | 'avatarASquare' | 'avatarBCircle' | 'avatarBSquare', string | null>

type DragState = {
  id: string
  startX: number
  startY: number
  originalX: number
  originalY: number
}

export function TemplateCanvas({ template, sourceUrls }: TemplateCanvasProps) {
  const { selectedElementId, selectElement, updateElement, canvasZoom } = useCoupleTemplateStore()
  const [drag, setDrag] = useState<DragState | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const elements = useMemo(() => sortedElements(template.elements), [template.elements])

  return (
    <div className="grid place-items-center overflow-auto rounded-lg bg-[#1d1d1f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] xl:h-full xl:min-h-0">
      <div
        ref={frameRef}
        className="relative origin-top-left shadow-2xl"
        style={{
          width: template.canvasWidth * canvasZoom,
          height: template.canvasHeight * canvasZoom,
          backgroundColor: template.backgroundColor,
        }}
        onPointerMove={(event) => {
          if (!drag) return
          const dx = (event.clientX - drag.startX) / canvasZoom
          const dy = (event.clientY - drag.startY) / canvasZoom
          updateElement(drag.id, { x: Math.round(drag.originalX + dx), y: Math.round(drag.originalY + dy) })
        }}
        onPointerUp={() => setDrag(null)}
      >
        {elements.map((element) => (
          <TemplateElementView
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            sourceUrls={sourceUrls}
            zoom={canvasZoom}
            onSelect={(eventElement) => selectElement(eventElement.id)}
            onStartDrag={(event, eventElement) => {
              if (eventElement.type === 'image' && eventElement.locked) return
              setDrag({ id: eventElement.id, startX: event.clientX, startY: event.clientY, originalX: eventElement.x, originalY: eventElement.y })
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TemplateElementView({
  element,
  isSelected,
  sourceUrls,
  zoom,
  onSelect,
  onStartDrag,
}: {
  element: CoupleTemplateElement
  isSelected: boolean
  sourceUrls: TemplateCanvasSourceUrls
  zoom: number
  onSelect: (element: CoupleTemplateElement) => void
  onStartDrag: (event: React.PointerEvent<HTMLDivElement>, element: CoupleTemplateElement) => void
}) {
  const style = {
    left: element.x * zoom,
    top: element.y * zoom,
    width: element.width * zoom,
    height: getElementHeight(element) * zoom,
    zIndex: element.zIndex,
  }
  if (element.type === 'shape') return <ShapeElement element={element} isSelected={isSelected} onSelect={onSelect} onStartDrag={onStartDrag} style={style} zoom={zoom} />
  if (element.type === 'text') return <TextElement element={element} isSelected={isSelected} onSelect={onSelect} onStartDrag={onStartDrag} style={style} zoom={zoom} />
  return <ImageElement element={element} isSelected={isSelected} onSelect={onSelect} onStartDrag={onStartDrag} sourceUrls={sourceUrls} style={style} zoom={zoom} />
}

function getElementHeight(element: CoupleTemplateElement) {
  return element.height ?? (element.type === 'text' ? element.fontSize * 1.45 : 0)
}

function baseClass(isSelected: boolean) {
  return `absolute select-none ${isSelected ? 'outline outline-2 outline-[#ff5f6d] outline-offset-2' : 'outline outline-1 outline-transparent'}`
}

function ImageElement({
  element,
  isSelected,
  sourceUrls,
  style,
  zoom,
  onSelect,
  onStartDrag,
}: {
  element: TemplateImageElement
  isSelected: boolean
  sourceUrls: TemplateCanvasSourceUrls
  style: React.CSSProperties
  zoom: number
  onSelect: (element: CoupleTemplateElement) => void
  onStartDrag: (event: React.PointerEvent<HTMLDivElement>, element: CoupleTemplateElement) => void
}) {
  const radius = element.shape === 'circle' ? '999px' : element.shape === 'rounded-rectangle' ? `${(element.borderRadius ?? 24) * zoom}px` : 0
  const adjustment: TemplateImageAdjustment = element.adjustment ?? { scale: 1, offsetX: 0, offsetY: 0, rotation: 0, flipX: false, flipY: false }
  const url = resolvePreviewUrl(element, sourceUrls)
  return (
    <div
      className={baseClass(isSelected)}
      style={{
        ...style,
        borderRadius: radius,
        border: element.borderWidth ? `${element.borderWidth * zoom}px solid ${element.borderColor ?? '#fff'}` : undefined,
        boxShadow: element.shadowColor
          ? `${(element.shadowOffsetX ?? 0) * zoom}px ${(element.shadowOffsetY ?? 0) * zoom}px ${(element.shadowBlur ?? 0) * zoom}px ${element.shadowColor}`
          : undefined,
        overflow: 'hidden',
      }}
      onPointerDown={(event) => {
        onSelect(element)
        onStartDrag(event, element)
      }}
    >
      {url ? (
        <img
          alt={element.source}
          className="h-full w-full"
          src={url}
          style={{
            objectFit: element.objectFit,
            transform: `translate(${adjustment.offsetX * zoom}px, ${adjustment.offsetY * zoom}px) scale(${adjustment.scale}) rotate(${adjustment.rotation}deg) scaleX(${adjustment.flipX ? -1 : 1}) scaleY(${adjustment.flipY ? -1 : 1})`,
          }}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[#ececec] text-xs text-[#737373]">{element.source}</div>
      )}
    </div>
  )
}

function resolvePreviewUrl(element: TemplateImageElement, sourceUrls: TemplateCanvasSourceUrls) {
  if (element.source === 'original') return sourceUrls.original
  if (element.source === 'avatarA') return element.shape === 'circle' ? sourceUrls.avatarACircle : sourceUrls.avatarASquare
  if (element.source === 'avatarB') return element.shape === 'circle' ? sourceUrls.avatarBCircle : sourceUrls.avatarBSquare
  return null
}

function TextElement({
  element,
  isSelected,
  style,
  zoom,
  onSelect,
  onStartDrag,
}: {
  element: TemplateTextElement
  isSelected: boolean
  style: React.CSSProperties
  zoom: number
  onSelect: (element: CoupleTemplateElement) => void
  onStartDrag: (event: React.PointerEvent<HTMLDivElement>, element: CoupleTemplateElement) => void
}) {
  return (
    <div
      className={`${baseClass(isSelected)} whitespace-pre-wrap`}
      style={{
        ...style,
        color: element.color,
        fontSize: element.fontSize * zoom,
        fontFamily: element.fontFamily,
        fontWeight: element.fontWeight,
        textAlign: element.textAlign,
        letterSpacing: (element.letterSpacing ?? 0) * zoom,
        lineHeight: element.lineHeight ?? 1.25,
        overflowWrap: 'break-word',
        textShadow: element.shadowColor
          ? `${(element.shadowOffsetX ?? 0) * zoom}px ${(element.shadowOffsetY ?? 0) * zoom}px ${(element.shadowBlur ?? 0) * zoom}px ${element.shadowColor}`
          : undefined,
        WebkitTextStroke: element.strokeWidth ? `${element.strokeWidth * zoom}px ${element.strokeColor ?? element.color}` : undefined,
        paintOrder: 'stroke fill',
      }}
      onPointerDown={(event) => {
        onSelect(element)
        onStartDrag(event, element)
      }}
    >
      {element.text}
    </div>
  )
}

function ShapeElement({
  element,
  isSelected,
  style,
  zoom,
  onSelect,
  onStartDrag,
}: {
  element: TemplateShapeElement
  isSelected: boolean
  style: React.CSSProperties
  zoom: number
  onSelect: (element: CoupleTemplateElement) => void
  onStartDrag: (event: React.PointerEvent<HTMLDivElement>, element: CoupleTemplateElement) => void
}) {
  return (
    <div
      className={baseClass(isSelected)}
      style={{
        ...style,
        background: element.shape === 'line' ? undefined : element.fill,
        borderRadius: element.shape === 'circle' ? '999px' : `${(element.borderRadius ?? 0) * zoom}px`,
        opacity: element.opacity ?? 1,
        border: element.strokeWidth ? `${element.strokeWidth * zoom}px solid ${element.stroke ?? element.fill}` : undefined,
        boxShadow: element.shadowColor
          ? `${(element.shadowOffsetX ?? 0) * zoom}px ${(element.shadowOffsetY ?? 0) * zoom}px ${(element.shadowBlur ?? 0) * zoom}px ${element.shadowColor}`
          : undefined,
      }}
      onPointerDown={(event) => {
        onSelect(element)
        onStartDrag(event, element)
      }}
    />
  )
}
