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

function makeStates(images: ImageAsset[], templateId: string): CollageImageState[] {
  const template = collageTemplates.find((item) => item.id === templateId) ?? collageTemplates[0]
  return images.slice(0, template.slots.length).map((image, index) => ({
    imageId: image.id,
    slotId: template.slots[index].id,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    flipX: false,
    flipY: false,
  }))
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
      return { images: nextImages, imageStates: makeStates(nextImages, state.templateId) }
    }),
  removeImage: (id) =>
    set((state) => {
      const removed = state.images.find((image) => image.id === id)
      revokeImageAsset(removed ?? null)
      const nextImages = state.images.filter((image) => image.id !== id)
      return { images: nextImages, imageStates: makeStates(nextImages, state.templateId) }
    }),
  clearImages: () =>
    set((state) => {
      state.images.forEach(revokeImageAsset)
      return { images: [], imageStates: [], selectedSlotId: null }
    }),
  reverseImages: () => set((state) => ({ images: [...state.images].reverse(), imageStates: makeStates([...state.images].reverse(), state.templateId) })),
  sortByName: () => set((state) => ({ images: [...state.images].sort((a, b) => a.name.localeCompare(b.name)), imageStates: makeStates([...state.images].sort((a, b) => a.name.localeCompare(b.name)), state.templateId) })),
  setTemplate: (templateId) => set((state) => ({ templateId, imageStates: makeStates(state.images, templateId), selectedSlotId: null })),
  updateImageState: (slotId, patch) => set((state) => ({ imageStates: state.imageStates.map((item) => (item.slotId === slotId ? { ...item, ...patch } : item)) })),
  selectSlot: (selectedSlotId) => set({ selectedSlotId }),
  updateStyle: (patch) => set((state) => ({ style: { ...state.style, ...patch } })),
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  applyAssignments: (templateId, assignments) =>
    set({
      templateId,
      imageStates: assignments.map((assignment) => ({
        imageId: assignment.imageId,
        slotId: assignment.slotId,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
        flipX: false,
        flipY: false,
      })),
      selectedSlotId: get().selectedSlotId,
    }),
}))

