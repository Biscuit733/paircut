import { create } from 'zustand'
import type { CouplePosterTemplate, CoupleTemplateElement } from '../types'
import { couplePosterTemplates } from '../templates'
import { cloneTemplate } from '../utils/scaleTemplate'

type CoupleTemplateStore = {
  selectedTemplateId: string
  workingTemplate: CouplePosterTemplate
  selectedElementId: string | null
  canvasZoom: number
  exportSize: string
  customWidth: number
  undoStack: CouplePosterTemplate[]
  redoStack: CouplePosterTemplate[]
  setTemplate: (templateId: string) => void
  resetTemplate: () => void
  selectElement: (id: string | null) => void
  updateTemplate: (patch: Partial<CouplePosterTemplate>) => void
  updateElement: (id: string, patch: Partial<CoupleTemplateElement>) => void
  undo: () => void
  redo: () => void
  setCanvasZoom: (zoom: number) => void
  setExportSize: (size: string) => void
  setCustomWidth: (width: number) => void
}

const initialTemplate = cloneTemplate(couplePosterTemplates[0])

export const useCoupleTemplateStore = create<CoupleTemplateStore>((set, get) => ({
  selectedTemplateId: initialTemplate.id,
  workingTemplate: initialTemplate,
  selectedElementId: null,
  canvasZoom: 0.52,
  exportSize: '1080x1200',
  customWidth: 1080,
  undoStack: [],
  redoStack: [],
  setTemplate: (templateId) => {
    const template = couplePosterTemplates.find((item) => item.id === templateId) ?? couplePosterTemplates[0]
    set({ selectedTemplateId: template.id, workingTemplate: cloneTemplate(template), selectedElementId: null, undoStack: [], redoStack: [] })
  },
  resetTemplate: () => {
    const template = couplePosterTemplates.find((item) => item.id === get().selectedTemplateId) ?? couplePosterTemplates[0]
    set((state) => ({
      workingTemplate: cloneTemplate(template),
      selectedElementId: null,
      undoStack: [...state.undoStack.slice(-29), cloneTemplate(state.workingTemplate)],
      redoStack: [],
    }))
  },
  selectElement: (id) => set({ selectedElementId: id }),
  updateTemplate: (patch) =>
    set((state) => ({
      workingTemplate: { ...state.workingTemplate, ...patch },
      undoStack: [...state.undoStack.slice(-29), cloneTemplate(state.workingTemplate)],
      redoStack: [],
    })),
  updateElement: (id, patch) =>
    set((state) => ({
      workingTemplate: {
        ...state.workingTemplate,
        elements: state.workingTemplate.elements.map((element) => (element.id === id ? ({ ...element, ...patch } as CoupleTemplateElement) : element)),
      },
      undoStack: [...state.undoStack.slice(-29), cloneTemplate(state.workingTemplate)],
      redoStack: [],
    })),
  undo: () => {
    const previous = get().undoStack.at(-1)
    if (!previous) return
    set((state) => ({
      workingTemplate: cloneTemplate(previous),
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack.slice(-29), cloneTemplate(state.workingTemplate)],
    }))
  },
  redo: () => {
    const next = get().redoStack.at(-1)
    if (!next) return
    set((state) => ({
      workingTemplate: cloneTemplate(next),
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack.slice(-29), cloneTemplate(state.workingTemplate)],
    }))
  },
  setCanvasZoom: (canvasZoom) => set({ canvasZoom }),
  setExportSize: (exportSize) => set({ exportSize }),
  setCustomWidth: (customWidth) => set({ customWidth }),
}))
