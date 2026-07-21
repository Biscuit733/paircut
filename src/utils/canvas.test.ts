import { describe, expect, it } from 'vitest'
import { makeCircleMaskPath, resolveOutputSize } from './canvas'

describe('canvas helpers', () => {
  it('resolves preset and custom output sizes', () => {
    expect(resolveOutputSize('1080x1440', 0, 0)).toEqual({ width: 1080, height: 1440 })
    expect(resolveOutputSize('custom', 900, 1200)).toEqual({ width: 900, height: 1200 })
  })

  it('computes circle mask from smaller side', () => {
    expect(makeCircleMaskPath(300, 200)).toEqual({ centerX: 150, centerY: 100, radius: 100 })
  })
})

