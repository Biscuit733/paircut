import { describe, expect, it } from 'vitest'
import { formatInspectorNumber } from './inspectorNumbers'

describe('inspector number formatting', () => {
  it('removes noisy floating point tails from generated dimensions', () => {
    expect(formatInspectorNumber(52.19999999999999)).toBe('52.2')
  })

  it('keeps integers compact', () => {
    expect(formatInspectorNumber(990)).toBe('990')
    expect(formatInspectorNumber(700.00000001)).toBe('700')
  })
})
