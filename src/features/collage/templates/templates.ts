import type { CollageTemplate } from '../types'

const slot = (id: string, x: number, y: number, width: number, height: number): CollageTemplate['slots'][number] => ({
  id,
  x,
  y,
  width,
  height,
  borderRadius: 0,
})

export const collageTemplates: CollageTemplate[] = [
  { id: 'two-horizontal', name: '左右平分', supportedImageCounts: [2], visualPriority: 7, slots: [slot('a', 0, 0, 0.5, 1), slot('b', 0.5, 0, 0.5, 1)] },
  { id: 'two-vertical', name: '上下平分', supportedImageCounts: [2], visualPriority: 6, slots: [slot('a', 0, 0, 1, 0.5), slot('b', 0, 0.5, 1, 0.5)] },
  { id: 'two-left-large', name: '左大右小', supportedImageCounts: [2], visualPriority: 9, slots: [slot('main', 0, 0, 0.64, 1), slot('side', 0.64, 0, 0.36, 1)] },
  { id: 'two-double-circle', name: '双圆头像', supportedImageCounts: [2], visualPriority: 8, slots: [slot('a', 0.1, 0.18, 0.36, 0.36), slot('b', 0.54, 0.46, 0.36, 0.36)] },
  { id: 'three-left-main', name: '左大右二', supportedImageCounts: [3], visualPriority: 9, slots: [slot('main', 0, 0, 0.62, 1), slot('b', 0.62, 0, 0.38, 0.5), slot('c', 0.62, 0.5, 0.38, 0.5)] },
  { id: 'three-columns', name: '三列', supportedImageCounts: [3], visualPriority: 6, slots: [slot('a', 0, 0, 0.333, 1), slot('b', 0.333, 0, 0.334, 1), slot('c', 0.667, 0, 0.333, 1)] },
  { id: 'four-grid', name: '2 x 2', supportedImageCounts: [4], visualPriority: 8, slots: [slot('a', 0, 0, 0.5, 0.5), slot('b', 0.5, 0, 0.5, 0.5), slot('c', 0, 0.5, 0.5, 0.5), slot('d', 0.5, 0.5, 0.5, 0.5)] },
  { id: 'four-main-three', name: '中间主图加三张小图', supportedImageCounts: [4], visualPriority: 10, slots: [slot('main', 0.18, 0.12, 0.64, 0.56), slot('a', 0.05, 0.72, 0.28, 0.23), slot('b', 0.36, 0.72, 0.28, 0.23), slot('c', 0.67, 0.72, 0.28, 0.23)] },
  { id: 'six-grid', name: '2 x 3', supportedImageCounts: [5, 6], visualPriority: 7, slots: [slot('a', 0, 0, 0.5, 0.333), slot('b', 0.5, 0, 0.5, 0.333), slot('c', 0, 0.333, 0.5, 0.334), slot('d', 0.5, 0.333, 0.5, 0.334), slot('e', 0, 0.667, 0.5, 0.333), slot('f', 0.5, 0.667, 0.5, 0.333)] },
  { id: 'nine-grid', name: '3 x 3 网格', supportedImageCounts: [7, 8, 9], visualPriority: 8, slots: Array.from({ length: 9 }, (_, index) => slot(String(index), (index % 3) / 3, Math.floor(index / 3) / 3, 1 / 3, 1 / 3)) },
]

export function filterTemplatesByImageCount(templates: CollageTemplate[], count: number) {
  if (count > 9) return templates.filter((template) => template.id === 'nine-grid')
  return templates.filter((template) => template.supportedImageCounts.includes(count))
}

