import type { CropConfig } from '../cropper/types'
import type { ProjectDraft, ProjectDraftInput, ProjectInfo, ProjectSourceImageMeta, ProjectStatus, RelationshipType } from './types'

const projectStatuses = new Set<ProjectStatus>(['draft', 'needs-crop', 'needs-template', 'needs-publish', 'complete'])
const relationshipTypes = new Set<RelationshipType>(['cp', 'partner', 'besties', 'brothers', 'other'])

export function createProjectDraft(input: ProjectDraftInput, now = new Date().toISOString()): ProjectDraft {
  return {
    id: input.id ?? crypto.randomUUID(),
    info: normalizeProjectInfo(input.info),
    sourceImage: input.sourceImage ? normalizeSourceImage(input.sourceImage) : null,
    avatarA: input.avatarA,
    avatarB: input.avatarB,
    selectedTemplateId: input.selectedTemplateId,
    exportSize: input.exportSize,
    customWidth: input.customWidth,
    createdAt: now,
    updatedAt: now,
  }
}

export function upsertProjectDraft(drafts: ProjectDraft[], draft: ProjectDraft) {
  return sortProjectDrafts([draft, ...drafts.filter((item) => item.id !== draft.id)])
}

export function markProjectDraftDeleted(drafts: ProjectDraft[], id: string, now = new Date().toISOString()) {
  return sortProjectDrafts(drafts.map((draft) => (draft.id === id ? { ...draft, deletedAt: now, updatedAt: now } : draft)))
}

export function restoreProjectDraft(drafts: ProjectDraft[], id: string, now = new Date().toISOString()) {
  return sortProjectDrafts(drafts.map((draft) => {
    if (draft.id !== id) return draft
    const { deletedAt: _deletedAt, ...restored } = draft
    return { ...restored, updatedAt: now }
  }))
}

export function parseProjectDraft(value: unknown): ProjectDraft | null {
  if (!isRecord(value)) return null
  const info = parseProjectInfo(value.info)
  const avatarA = parseCropConfig(value.avatarA)
  const avatarB = parseCropConfig(value.avatarB)
  if (!info || !avatarA || !avatarB) return null
  if (!isNonEmptyString(value.id) || !isNonEmptyString(value.selectedTemplateId) || !isNonEmptyString(value.exportSize)) return null
  if (!isNumber(value.customWidth) || !isNonEmptyString(value.createdAt) || !isNonEmptyString(value.updatedAt)) return null
  const sourceImage = value.sourceImage === null ? null : parseSourceImage(value.sourceImage)
  if (value.sourceImage !== null && !sourceImage) return null
  if (value.deletedAt !== undefined && !isNonEmptyString(value.deletedAt)) return null
  return {
    id: value.id,
    info,
    sourceImage,
    avatarA,
    avatarB,
    selectedTemplateId: value.selectedTemplateId,
    exportSize: value.exportSize,
    customWidth: value.customWidth,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    ...(value.deletedAt ? { deletedAt: value.deletedAt } : {}),
  }
}

export function parseProjectDraftList(value: unknown) {
  if (!Array.isArray(value)) return []
  return sortProjectDrafts(value.flatMap((item) => {
    const draft = parseProjectDraft(item)
    return draft ? [draft] : []
  }))
}

function sortProjectDrafts(drafts: ProjectDraft[]) {
  return [...drafts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

function normalizeProjectInfo(info: ProjectInfo): ProjectInfo {
  return {
    ...info,
    tags: info.tags.map((tag) => tag.trim()).filter(Boolean),
  }
}

function normalizeSourceImage(source: ProjectSourceImageMeta): ProjectSourceImageMeta {
  return {
    name: source.name,
    width: source.width,
    height: source.height,
    aspectRatio: source.aspectRatio,
    size: source.size,
  }
}

function parseProjectInfo(value: unknown): ProjectInfo | null {
  if (!isRecord(value)) return null
  if (!isString(value.seriesName) || !isString(value.issue) || !isString(value.title) || !isString(value.animeName)) return null
  if (!isString(value.roleA) || !isString(value.roleB) || !isString(value.notes)) return null
  if (!isString(value.relationshipType) || !relationshipTypes.has(value.relationshipType as RelationshipType)) return null
  if (!isString(value.status) || !projectStatuses.has(value.status as ProjectStatus)) return null
  if (!Array.isArray(value.tags) || value.tags.some((tag) => !isString(tag))) return null
  return normalizeProjectInfo({
    seriesName: value.seriesName,
    issue: value.issue,
    title: value.title,
    animeName: value.animeName,
    roleA: value.roleA,
    roleB: value.roleB,
    relationshipType: value.relationshipType as RelationshipType,
    tags: value.tags,
    notes: value.notes,
    status: value.status as ProjectStatus,
  })
}

function parseSourceImage(value: unknown): ProjectSourceImageMeta | null {
  if (!isRecord(value)) return null
  if (!isString(value.name) || !isNumber(value.width) || !isNumber(value.height) || !isNumber(value.aspectRatio) || !isNumber(value.size)) return null
  return normalizeSourceImage({
    name: value.name,
    width: value.width,
    height: value.height,
    aspectRatio: value.aspectRatio,
    size: value.size,
  })
}

function parseCropConfig(value: unknown): CropConfig | null {
  if (!isRecord(value)) return null
  if (!isRecord(value.crop) || !isNumber(value.crop.x) || !isNumber(value.crop.y)) return null
  if (!isString(value.shape) || !isNumber(value.zoom) || !isNumber(value.rotation)) return null
  if (!isBoolean(value.flipX) || !isBoolean(value.flipY)) return null
  if (!isNumber(value.outputWidth) || !isNumber(value.outputHeight) || !isString(value.backgroundColor)) return null
  if (value.aspectRatio !== null && !isNumber(value.aspectRatio)) return null
  if (value.croppedAreaPixels !== null && !isCropArea(value.croppedAreaPixels)) return null
  return value as CropConfig
}

function isCropArea(value: unknown) {
  return isRecord(value) && isNumber(value.x) && isNumber(value.y) && isNumber(value.width) && isNumber(value.height)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
