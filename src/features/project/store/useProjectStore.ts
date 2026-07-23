import { create } from 'zustand'
import { createProjectDraft, markProjectDraftDeleted, parseProjectDraftList, restoreProjectDraft, upsertProjectDraft } from '../projectDraft'
import type { ProjectDraft, ProjectDraftInput, ProjectInfo } from '../types'
import { emptyProjectInfo } from '../types'

const storageKey = 'biscuit-avatar-workshop-project-drafts-v1'

type ProjectStore = {
  info: ProjectInfo
  drafts: ProjectDraft[]
  selectedDraftId: string | null
  lastSavedAt: string | null
  updateInfo: (patch: Partial<ProjectInfo>) => void
  resetInfo: () => void
  saveDraft: (input: Omit<ProjectDraftInput, 'info'>) => ProjectDraft
  selectDraft: (id: string) => ProjectDraft | null
  deleteDraft: (id: string) => void
  restoreDraft: (id: string) => void
}

function readDrafts() {
  if (typeof window === 'undefined') return []
  try {
    return parseProjectDraftList(JSON.parse(window.localStorage.getItem(storageKey) ?? '[]'))
  } catch {
    return []
  }
}

function writeDrafts(drafts: ProjectDraft[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey, JSON.stringify(drafts))
}

function draftTitle(info: ProjectInfo) {
  return info.title.trim() || [info.seriesName, info.issue].filter(Boolean).join(' ') || '未命名情头'
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  info: emptyProjectInfo,
  drafts: readDrafts(),
  selectedDraftId: null,
  lastSavedAt: null,
  updateInfo: (patch) => set((state) => ({ info: { ...state.info, ...patch } })),
  resetInfo: () => set({ info: emptyProjectInfo, selectedDraftId: null }),
  saveDraft: (input) => {
    const now = new Date().toISOString()
    const existing = get().drafts.find((draft) => draft.id === get().selectedDraftId)
    const draft = {
      ...createProjectDraft(
        {
          ...input,
          id: existing?.id,
          info: { ...get().info, title: draftTitle(get().info) },
        },
        now,
      ),
      createdAt: existing?.createdAt ?? now,
    }
    const drafts = upsertProjectDraft(get().drafts, draft)
    writeDrafts(drafts)
    set({ drafts, selectedDraftId: draft.id, info: draft.info, lastSavedAt: now })
    return draft
  },
  selectDraft: (id) => {
    const draft = get().drafts.find((item) => item.id === id) ?? null
    if (draft) set({ selectedDraftId: draft.id, info: draft.info })
    return draft
  },
  deleteDraft: (id) => {
    const drafts = markProjectDraftDeleted(get().drafts, id)
    writeDrafts(drafts)
    set((state) => ({ drafts, selectedDraftId: state.selectedDraftId === id ? null : state.selectedDraftId }))
  },
  restoreDraft: (id) => {
    const drafts = restoreProjectDraft(get().drafts, id)
    const draft = drafts.find((item) => item.id === id) ?? null
    writeDrafts(drafts)
    set({ drafts, selectedDraftId: id, info: draft?.info ?? get().info })
  },
}))
