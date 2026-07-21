import { describe, expect, it } from 'vitest'
import { classifyImageRatio, clampCropArea } from './image'

describe('image helpers', () => {
  it('classifies common image ratios', () => {
    expect(classifyImageRatio(4 / 3)).toBe('landscape')
    expect(classifyImageRatio(3 / 4)).toBe('portrait')
    expect(classifyImageRatio(1.02)).toBe('square')
  })

  it('clamps crop area inside image bounds', () => {
    expect(clampCropArea({ x: -10, y: 20, width: 140, height: 220 }, 100, 200)).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 200,
    })
  })
})

