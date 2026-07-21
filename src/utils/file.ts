const invalidWindowsChars = new Set(['<', '>', ':', '"', '/', '\\', '|', '?', '*'])

function isWindowsInvalidChar(char: string) {
  return invalidWindowsChars.has(char) || char.charCodeAt(0) < 32
}

export function sanitizeFileName(name: string, fallback = 'paircut-export') {
  const cleaned = name
    .trim()
    .split('')
    .filter((char) => !isWindowsInvalidChar(char))
    .join('')
    .replace(/\s+/g, '-')
    .replace(/\.+$/g, '')
  return cleaned || fallback
}

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 400)
}

export function extensionForFormat(format: 'png' | 'jpeg' | 'webp') {
  return format === 'jpeg' ? 'jpg' : format
}
