import { describe, expect, it } from 'vitest'
import { defaultCropConfig } from '../cropper/utils/cropImage'
import {
  createProjectDraft,
  markProjectDraftDeleted,
  parseProjectDraft,
  restoreProjectDraft,
  upsertProjectDraft,
} from './projectDraft'
import type { ProjectInfo } from './types'

const info: ProjectInfo = {
  seriesName: '今天这两',
  issue: '002',
  title: '五条悟 x 夏油杰',
  animeName: '咒术回战',
  roleA: '五条悟',
  roleB: '夏油杰',
  relationshipType: 'cp',
  tags: ['蓝色', '挚友'],
  notes: '偏日常',
  status: 'needs-crop',
}

describe('project drafts', () => {
  it('creates a portable draft without embedding image data', () => {
    const draft = createProjectDraft({
      id: 'draft-1',
      info,
      sourceImage: {
        name: 'source.png',
        width: 1600,
        height: 1200,
        aspectRatio: 4 / 3,
        size: 2048,
      },
      avatarA: defaultCropConfig({ crop: { x: 70, y: 0 } }),
      avatarB: defaultCropConfig({ crop: { x: -70, y: 0 } }),
      selectedTemplateId: 'dark-profile-showcase',
      exportSize: '1080x1200',
      customWidth: 1080,
    }, '2026-07-23T08:00:00.000Z')

    expect(draft).toMatchObject({
      id: 'draft-1',
      info,
      sourceImage: { name: 'source.png', width: 1600, height: 1200 },
      selectedTemplateId: 'dark-profile-showcase',
      createdAt: '2026-07-23T08:00:00.000Z',
      updatedAt: '2026-07-23T08:00:00.000Z',
    })
    expect(JSON.stringify(draft)).not.toContain('data:image')
  })

  it('parses valid persisted drafts and rejects corrupted input', () => {
    const draft = createProjectDraft({
      id: 'draft-1',
      info,
      sourceImage: null,
      avatarA: defaultCropConfig(),
      avatarB: defaultCropConfig(),
      selectedTemplateId: 'original-double-circle-dark',
      exportSize: '1080x1200',
      customWidth: 1080,
    }, '2026-07-23T08:00:00.000Z')

    expect(parseProjectDraft(draft)?.id).toBe('draft-1')
    expect(parseProjectDraft({ ...draft, info: { ...draft.info, status: 'lost' } })).toBeNull()
    expect(parseProjectDraft({ ...draft, avatarA: { crop: null } })).toBeNull()
  })

  it('upserts drafts by updated time and keeps deleted drafts recoverable', () => {
    const older = createProjectDraft({
      id: 'older',
      info: { ...info, title: '旧草稿' },
      sourceImage: null,
      avatarA: defaultCropConfig(),
      avatarB: defaultCropConfig(),
      selectedTemplateId: 'original-double-circle-dark',
      exportSize: '1080x1200',
      customWidth: 1080,
    }, '2026-07-23T08:00:00.000Z')
    const newer = createProjectDraft({
      id: 'newer',
      info: { ...info, title: '新草稿' },
      sourceImage: null,
      avatarA: defaultCropConfig(),
      avatarB: defaultCropConfig(),
      selectedTemplateId: 'xhs-cute-post',
      exportSize: '1440x1920',
      customWidth: 1440,
    }, '2026-07-23T09:00:00.000Z')

    const list = upsertProjectDraft([older], newer)
    expect(list.map((draft) => draft.id)).toEqual(['newer', 'older'])

    const deleted = markProjectDraftDeleted(list, 'newer', '2026-07-23T10:00:00.000Z')
    expect(deleted[0].deletedAt).toBe('2026-07-23T10:00:00.000Z')

    const restored = restoreProjectDraft(deleted, 'newer', '2026-07-23T11:00:00.000Z')
    expect(restored[0]).toMatchObject({ id: 'newer', updatedAt: '2026-07-23T11:00:00.000Z' })
    expect(restored[0]).not.toHaveProperty('deletedAt')
  })
})
