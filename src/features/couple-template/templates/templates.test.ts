import { describe, expect, it } from 'vitest'
import { couplePosterTemplates } from '.'
import type { CoupleTemplateElement } from '../types'
import { applyTemplateDefaults } from '../utils/applyTemplateDefaults'

function elementHeight(element: CoupleTemplateElement) {
  return element.height ?? (element.type === 'text' ? element.fontSize * (element.lineHeight ?? 1.25) : 0)
}

describe('couple poster templates', () => {
  it('keeps every element inside its canvas', () => {
    const failures = couplePosterTemplates.flatMap((template) =>
      template.elements
        .filter((element) => {
          const height = elementHeight(element)
          return element.x < 0 || element.y < 0 || element.x + element.width > template.canvasWidth || element.y + height > template.canvasHeight
        })
        .map((element) => `${template.id}:${element.id}`),
    )

    expect(failures).toEqual([])
  })

  it('avoids noisy social-platform text in default templates', () => {
    const banned = /关注|#[^\s]+|@[^\s]+/
    const failures = couplePosterTemplates.flatMap((template) =>
      template.elements.flatMap((element) => {
        if (element.type !== 'text' || !banned.test(element.text)) return []
        return `${template.id}:${element.id}:${element.text}`
      }),
    )

    expect(failures).toEqual([])
  })

  it('applies workshop creator and theme defaults to template text', () => {
    const template = applyTemplateDefaults(couplePosterTemplates[0], {
      creatorName: 'Momo',
      themeSeries: '今天这两',
    })
    const text = template.elements.filter((element) => element.type === 'text').map((element) => element.text).join('\n')

    expect(text).toContain('Momo')
    expect(text).toContain('今天这两')
    expect(text).not.toContain('Biscuit')
    expect(text).not.toContain('一丁点甜')
  })
})
