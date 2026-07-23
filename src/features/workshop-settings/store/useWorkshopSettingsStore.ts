import { create } from 'zustand'
import { defaultWorkshopSettings, type WorkshopSettings } from '../types'

const storageKey = 'biscuit-avatar-workshop-settings-v1'

type WorkshopSettingsStore = {
  settings: WorkshopSettings
  updateSettings: (patch: Partial<WorkshopSettings>) => WorkshopSettings
  resetSettings: () => WorkshopSettings
}

export function normalizeWorkshopSettings(input: Partial<WorkshopSettings> | null | undefined): WorkshopSettings {
  const creatorName = input?.creatorName?.trim() || defaultWorkshopSettings.creatorName
  const themeSeries = input?.themeSeries?.trim() || defaultWorkshopSettings.themeSeries
  return { creatorName, themeSeries }
}

export function readWorkshopSettings(): WorkshopSettings {
  if (typeof window === 'undefined') return defaultWorkshopSettings
  try {
    return normalizeWorkshopSettings(JSON.parse(window.localStorage.getItem(storageKey) ?? 'null') as Partial<WorkshopSettings> | null)
  } catch {
    return defaultWorkshopSettings
  }
}

function writeWorkshopSettings(settings: WorkshopSettings) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey, JSON.stringify(settings))
}

export const useWorkshopSettingsStore = create<WorkshopSettingsStore>((set, get) => ({
  settings: readWorkshopSettings(),
  updateSettings: (patch) => {
    const settings = normalizeWorkshopSettings({ ...get().settings, ...patch })
    writeWorkshopSettings(settings)
    set({ settings })
    return settings
  },
  resetSettings: () => {
    writeWorkshopSettings(defaultWorkshopSettings)
    set({ settings: defaultWorkshopSettings })
    return defaultWorkshopSettings
  },
}))
