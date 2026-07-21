import { create } from 'zustand'

type HistoryStore = {
  undoStack: string[]
  redoStack: string[]
  push: (label: string) => void
  undo: () => string | null
  redo: () => string | null
  clear: () => void
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],
  push: (label) =>
    set((state) => ({
      undoStack: [...state.undoStack.slice(-29), label],
      redoStack: [],
    })),
  undo: () => {
    const stack = get().undoStack
    const label = stack.at(-1) ?? null
    if (!label) return null
    set((state) => ({
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, label],
    }))
    return label
  },
  redo: () => {
    const stack = get().redoStack
    const label = stack.at(-1) ?? null
    if (!label) return null
    set((state) => ({
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack, label],
    }))
    return label
  },
  clear: () => set({ undoStack: [], redoStack: [] }),
}))

