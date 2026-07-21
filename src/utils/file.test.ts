import { describe, expect, it } from 'vitest'
import { sanitizeFileName } from './file'

describe('sanitizeFileName', () => {
  it('removes Windows-invalid characters and trims whitespace', () => {
    expect(sanitizeFileName(' 凪:诚/士*郎?夏日祭. ')).toBe('凪诚士郎夏日祭')
  })

  it('uses fallback when the result is empty', () => {
    expect(sanitizeFileName('///', 'fallback')).toBe('fallback')
  })
})

