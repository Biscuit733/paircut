import { describe, expect, it } from 'vitest'
import { templateFontOptions } from './fontOptions'

describe('template font options', () => {
  it('includes cute open-source English font choices', () => {
    const labels = templateFontOptions.map((option) => option.label)

    expect(labels).toEqual(expect.arrayContaining([
      'Fredoka 圆滚滚',
      'Baloo 2 软糖',
      'Comic Neue 漫画',
      'Bubblegum Sans 泡泡糖',
      'Pacifico 甜甜签名',
    ]))
  })

  it('keeps font family values unique', () => {
    const values = templateFontOptions.map((option) => option.value)

    expect(new Set(values).size).toBe(values.length)
  })
})
