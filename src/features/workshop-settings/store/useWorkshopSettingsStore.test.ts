import { describe, expect, it } from 'vitest'
import { normalizeWorkshopSettings } from './useWorkshopSettingsStore'

describe('workshop settings', () => {
  it('keeps stable defaults when settings are blank', () => {
    expect(normalizeWorkshopSettings({ creatorName: '', themeSeries: '  ' })).toEqual({
      creatorName: 'Biscuit',
      themeSeries: '一丁点甜',
    })
  })

  it('trims custom creator and theme series', () => {
    expect(normalizeWorkshopSettings({ creatorName: '  Momo  ', themeSeries: ' 今天这两 ' })).toEqual({
      creatorName: 'Momo',
      themeSeries: '今天这两',
    })
  })
})
