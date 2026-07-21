export function getCoverRect(sourceRatio: number, targetWidth: number, targetHeight: number) {
  const targetRatio = targetWidth / targetHeight
  if (sourceRatio > targetRatio) {
    const height = targetHeight
    const width = height * sourceRatio
    return { x: (targetWidth - width) / 2, y: 0, width, height }
  }
  const width = targetWidth
  const height = width / sourceRatio
  return { x: 0, y: (targetHeight - height) / 2, width, height }
}

export function resolveOutputSize(
  preset: string,
  customWidth: number,
  customHeight: number,
  fallbackRatio = 1,
) {
  if (preset === 'custom') {
    const width = Math.max(64, Math.round(customWidth))
    const height = Math.max(64, Math.round(customHeight || width / fallbackRatio))
    return { width, height }
  }
  const [width, height] = preset.split('x').map((value) => Number(value))
  return { width, height }
}

export function applyRoundedClip(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + safeRadius, y)
  context.lineTo(x + width - safeRadius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  context.lineTo(x + width, y + height - safeRadius)
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  context.lineTo(x + safeRadius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  context.lineTo(x, y + safeRadius)
  context.quadraticCurveTo(x, y, x + safeRadius, y)
  context.closePath()
}

export function makeCircleMaskPath(width: number, height: number) {
  const radius = Math.min(width, height) / 2
  return { centerX: width / 2, centerY: height / 2, radius }
}

