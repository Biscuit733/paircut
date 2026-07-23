import { create } from 'zustand'
import type { CollageImageState, CollageStyle } from '../types'
import type { ImageAsset } from '../../uploader/types'
import { collageTemplates } from '../templates/templates'
import { revokeImageAsset } from '../../../utils/image'

type CollageStore = {
  images: ImageAsset[]
  templateId: string
  imageStates: CollageImageState[]
  selectedSlotId: string | null
  style: CollageStyle
  canvasSize: string
  addImages: (images: ImageAsset[]) => void
  removeImage: (id: string) => void
  clearImages: () => void
  reverseImages: () => void
  sortByName: () => void
  moveImage: (imageId: string, targetIndex: number) => void
  swapSlots: (slotIdA: string, slotIdB: string) => void
  assignImageToSlot: (imageId: string, slotId: string) => void
  moveSelectedSlot: (direction: -1 | 1) => void
  setTemplate: (templateId: string) => void
  updateImageState: (slotId: string, patch: Partial<CollageImageState>) => void
  selectSlot: (slotId: string | null) => void
  updateStyle: (patch: Partial<CollageStyle>) => void
  setCanvasSize: (size: string) => void
  applyAssignments: (templateId: string, assignments: Array<{ imageId: string; slotId: string }>) => void
}

const defaultStyle: CollageStyle = {
  gap: 18,
  padding: 32,
  radius: 24,
  backgroundColor: '#ffffff',
  borderColor: '#ffffff',
  borderWidth: 0,
  shadow: false,
  shadowBlur: 20,
  shadowOpacity: 0.18,
}

function defaultState(imageId: string, slotId: string): CollageImageState {
  return {
    imageId,
    slotId,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    flipX: false,
    flipY: false,
  }
}

function makeStates(images: ImageAsset[], templateId: string, previousStates: CollageImageState[] = []): CollageImageState[] {
  const template = collageTemplates.find((item) => item.id === templateId) ?? collageTemplates[0]
  return images.slice(0, template.slots.length).map((image, index) => {
    const previous = previousStates.find((item) => item.imageId === image.id)
    return { ...(previous ?? defaultState(image.id, template.slots[index].id)), imageId: image.id, slotId: template.slots[index].id }
  })
}

function moveItem<T>(items: T[], fromIndex: number, targetIndex: number) {
  if (fromIndex < 0) return items
  const next = [...items]
  const [item] = next.splice(fromIndex, 1)
  next.splice(Math.min(Math.max(targetIndex, 0), next.length), 0, item)
  return next
}

export const useCollageStore = create<CollageStore>((set, get) => ({
  images: [],
  templateId: 'two-horizontal',
  imageStates: [],
  selectedSlotId: null,
  style: defaultStyle,
  canvasSize: '1080x1440',
  addImages: (images) =>
    set((state) => {
      const nextImages = [...state.images, ...images].slice(0, 20)
      return { images: nextImages, imageStates: makeStates(nextImages, state.templateId, state.imageStates) }
    }),
  removeImage: (id) =>
    set((state) => {
      const removed = state.images.find((image) => image.id === id)
      revokeImageAsset(removed ?? null)
      const nextImages = state.images.filter((image) => image.id !== id)
      return { images: nextImages, imageStates: makeStates(nextImages, state.templateId, state.imageStates), selectedSlotId: state.imageStates.find((item) => item.imageId === id)?.slotId === state.selectedSlotId ? null : state.selectedSlotId }
    }),
  clearImages: () =>
    set((state) => {
      state.images.forEach(revokeImageAsset)
      return { images: [], imageStates: [], selectedSlotId: null }
    }),
  reverseImages: () =>
    set((state) => {
      const images = [...state.images].reverse()
      return { images, imageStates: makeStates(images, state.templateId, state.imageStates) }
    }),
  sortByName: () =>
    set((state) => {
      const images = [...state.images].sort((a, b) => a.name.localeCompare(b.name))
      return { images, imageStates: makeStates(images, state.templateId, state.imageStates) }
    }),
  moveImage: (imageId, targetIndex) =>
    set((state) => {
      const images = moveItem(state.images, state.images.findIndex((image) => image.id === imageId), targetIndex)
      return { images, imageStates: makeStates(images, state.templateId, state.imageStates) }
    }),
  swapSlots: (slotIdA, slotIdB) =>
    set((state) => ({
      imageStates: state.imageStates.map((item) =>
        item.slotId === slotIdA ? { ...item, slotId: slotIdB } : item.slotId === slotIdB ? { ...item, slotId: slotIdA } : item,
      ),
      selectedSlotId: slotIdB,
    })),
  assignImageToSlot: (imageId, slotId) =>
    set((state) => {
      const source = state.imageStates.find((item) => item.imageId === imageId)
      const target = state.imageStates.find((item) => item.slotId === slotId)
      if (!source || source.slotId === slotId) return { selectedSlotId: slotId }
      return {
        imageStates: state.imageStates.map((item) =>
          item.imageId === imageId
            ? { ...item, slotId }
            : target && item.imageId === target.imageId
              ? { ...item, slotId: source.slotId }
              : item,
        ),
        selectedSlotId: slotId,
      }
    }),
  moveSelectedSlot: (direction) =>
    set((state) => {
      if (!state.selectedSlotId) return {}
      const template = collageTemplates.find((item) => item.id === state.templateId) ?? collageTemplates[0]
      const slots = template.slots.slice(0, state.images.length)
      const index = slots.findIndex((slot) => slot.id === state.selectedSlotId)
      const targetSlot = slots[index + direction]
      if (!targetSlot) return {}
      return {
        imageStates: state.imageStates.map((item) =>
          item.slotId === state.selectedSlotId
            ? { ...item, slotId: targetSlot.id }
            : item.slotId === targetSlot.id
              ? { ...item, slotId: state.selectedSlotId ?? item.slotId }
              : item,
        ),
        selectedSlotId: targetSlot.id,
      }
    }),
  setTemplate: (templateId) => set((state) => ({ templateId, imageStates: makeStates(state.images, templateId, state.imageStates), selectedSlotId: null })),
  updateImageState: (slotId, patch) => set((state) => ({ imageStates: state.imageStates.map((item) => (item.slotId === slotId ? { ...item, ...patch } : item)) })),
  selectSlot: (selectedSlotId) => set({ selectedSlotId }),
  updateStyle: (patch) => set((state) => ({ style: { ...state.style, ...patch } })),
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  applyAssignments: (templateId, assignments) =>
    set({
      templateId,
      imageStates: assignments.map((assignment) => ({
        ...(get().imageStates.find((item) => item.imageId === assignment.imageId) ?? defaultState(assignment.imageId, assignment.slotId)),
        imageId: assignment.imageId,
        slotId: assignment.slotId,
      })),
      selectedSlotId: get().selectedSlotId,
    }),
}))
