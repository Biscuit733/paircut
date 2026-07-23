import type { CropConfig } from '../cropper/types'
import { defaultWorkshopSettings, type WorkshopSettings } from '../workshop-settings/types'

export type ProjectStatus = 'draft' | 'needs-crop' | 'needs-template' | 'needs-publish' | 'complete'

export type RelationshipType = 'cp' | 'partner' | 'besties' | 'brothers' | 'other'

export type ProjectInfo = {
  seriesName: string
  issue: string
  title: string
  animeName: string
  roleA: string
  roleB: string
  relationshipType: RelationshipType
  tags: string[]
  notes: string
  status: ProjectStatus
}

export type ProjectSourceImageMeta = {
  name: string
  width: number
  height: number
  aspectRatio: number
  size: number
}

export type ProjectDraftInput = {
  id?: string
  info: ProjectInfo
  sourceImage: ProjectSourceImageMeta | null
  avatarA: CropConfig
  avatarB: CropConfig
  selectedTemplateId: string
  exportSize: string
  customWidth: number
}

export type ProjectDraft = {
  id: string
  info: ProjectInfo
  sourceImage: ProjectSourceImageMeta | null
  avatarA: CropConfig
  avatarB: CropConfig
  selectedTemplateId: string
  exportSize: string
  customWidth: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export const emptyProjectInfo: ProjectInfo = {
  seriesName: '',
  issue: '',
  title: '',
  animeName: '',
  roleA: '',
  roleB: '',
  relationshipType: 'cp',
  tags: [],
  notes: '',
  status: 'draft',
}

export function createDefaultProjectInfo(settings: WorkshopSettings = defaultWorkshopSettings): ProjectInfo {
  return {
    ...emptyProjectInfo,
    seriesName: settings.themeSeries,
  }
}
