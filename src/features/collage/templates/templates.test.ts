import { describe, expect, it } from 'vitest'
import { collageTemplates, filterTemplatesByImageCount } from './templates'

describe('collage template filtering', () => {
  it('returns templates for matching image count', () => {
    expect(filterTemplatesByImageCount(collageTemplates, 2).some((template) => template.id === 'two-horizontal')).toBe(true)
    expect(filterTemplatesByImageCount(collageTemplates, 4).some((template) => template.id === 'four-grid')).toBe(true)
  })
})

