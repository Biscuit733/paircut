import { describe, expect, it } from 'vitest'
import type { ImageAsset } from '../../uploader/types'
import { collageTemplates } from '../templates/templates'
import { recommendLayout } from './layoutScoring'

function image(id: string, width: number, height: number): ImageAsset {
  return {
    id,
    width,
    height,
    aspectRatio: width / height,
    name: `${id}.jpg`,
    size: 100,
    file: new File(['x'], `${id}.jpg`, { type: 'image/jpeg' }),
    objectUrl: '',
    previewUrl: '',
  }
}

describe('recommendLayout', () => {
  it('selects a supported template and assigns every image', () => {
    const images = [image('a', 1200, 900), image('b', 900, 1200), image('c', 1000, 1000)]
    const result = recommendLayout(images, 3 / 4, collageTemplates)
    expect(result.templateId).toBeTruthy()
    expect(result.assignments).toHaveLength(3)
    expect(result.score).toBeGreaterThan(0)
  })
})

