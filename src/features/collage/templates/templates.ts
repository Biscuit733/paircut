import type { CollageTemplate } from '../types'

const slot = (id: string, x: number, y: number, width: number, height: number): CollageTemplate['slots'][number] => ({
  id,
  x,
  y,
  width,
  height,
  borderRadius: 0,
})

function gridTemplate(id: string, name: string, count: number, columns: number, visualPriority = 6): CollageTemplate {
  const rows = Math.ceil(count / columns)
  return {
    id,
    name,
    supportedImageCounts: [count],
    visualPriority,
    slots: Array.from({ length: count }, (_, index) => slot(String(index), (index % columns) / columns, Math.floor(index / columns) / rows, 1 / columns, 1 / rows)),
  }
}

function stripTemplate(id: string, name: string, count: number, direction: 'row' | 'column', visualPriority = 5): CollageTemplate {
  return {
    id,
    name,
    supportedImageCounts: [count],
    visualPriority,
    slots: Array.from({ length: count }, (_, index) =>
      direction === 'row'
        ? slot(String(index), index / count, 0, 1 / count, 1)
        : slot(String(index), 0, index / count, 1, 1 / count),
    ),
  }
}

export const collageTemplates: CollageTemplate[] = [
  { id: 'two-horizontal', name: '左右平分', supportedImageCounts: [2], visualPriority: 7, slots: [slot('a', 0, 0, 0.5, 1), slot('b', 0.5, 0, 0.5, 1)] },
  { id: 'two-vertical', name: '上下平分', supportedImageCounts: [2], visualPriority: 6, slots: [slot('a', 0, 0, 1, 0.5), slot('b', 0, 0.5, 1, 0.5)] },
  { id: 'two-left-large', name: '左大右小', supportedImageCounts: [2], visualPriority: 9, slots: [slot('main', 0, 0, 0.64, 1), slot('side', 0.64, 0, 0.36, 1)] },
  { id: 'two-top-large', name: '上大下小', supportedImageCounts: [2], visualPriority: 8, slots: [slot('main', 0, 0, 1, 0.66), slot('side', 0, 0.66, 1, 0.34)] },
  { id: 'two-double-circle', name: '双圆头像', supportedImageCounts: [2], visualPriority: 8, slots: [slot('a', 0.1, 0.18, 0.36, 0.36), slot('b', 0.54, 0.46, 0.36, 0.36)] },

  { id: 'three-left-main', name: '左大右二', supportedImageCounts: [3], visualPriority: 9, slots: [slot('main', 0, 0, 0.62, 1), slot('b', 0.62, 0, 0.38, 0.5), slot('c', 0.62, 0.5, 0.38, 0.5)] },
  { id: 'three-top-main', name: '上大下二', supportedImageCounts: [3], visualPriority: 8, slots: [slot('main', 0, 0, 1, 0.58), slot('b', 0, 0.58, 0.5, 0.42), slot('c', 0.5, 0.58, 0.5, 0.42)] },
  { id: 'three-columns', name: '三列', supportedImageCounts: [3], visualPriority: 6, slots: [slot('a', 0, 0, 0.333, 1), slot('b', 0.333, 0, 0.334, 1), slot('c', 0.667, 0, 0.333, 1)] },

  { id: 'four-grid', name: '2 x 2', supportedImageCounts: [4], visualPriority: 8, slots: [slot('a', 0, 0, 0.5, 0.5), slot('b', 0.5, 0, 0.5, 0.5), slot('c', 0, 0.5, 0.5, 0.5), slot('d', 0.5, 0.5, 0.5, 0.5)] },
  { id: 'four-main-three', name: '主图三辅', supportedImageCounts: [4], visualPriority: 10, slots: [slot('main', 0, 0, 0.64, 0.64), slot('a', 0.64, 0, 0.36, 0.32), slot('b', 0.64, 0.32, 0.36, 0.32), slot('c', 0, 0.64, 1, 0.36)] },
  { id: 'four-postcard', name: '明信片', supportedImageCounts: [4], visualPriority: 8, slots: [slot('a', 0, 0, 1, 0.42), slot('b', 0, 0.42, 0.5, 0.58), slot('c', 0.5, 0.42, 0.25, 0.58), slot('d', 0.75, 0.42, 0.25, 0.58)] },

  { id: 'five-hero-stack', name: '一主四辅', supportedImageCounts: [5], visualPriority: 10, slots: [slot('main', 0, 0, 1, 0.48), slot('a', 0, 0.48, 0.5, 0.26), slot('b', 0.5, 0.48, 0.5, 0.26), slot('c', 0, 0.74, 0.5, 0.26), slot('d', 0.5, 0.74, 0.5, 0.26)] },
  gridTemplate('five-masonry', '错落五图', 5, 2, 8),
  stripTemplate('five-long', '五段长图', 5, 'column', 6),

  gridTemplate('six-grid', '2 x 3', 6, 2, 8),
  gridTemplate('six-three-cols', '3 x 2', 6, 3, 7),
  { id: 'six-hero', name: '六图主视觉', supportedImageCounts: [6], visualPriority: 10, slots: [slot('main', 0, 0, 0.66, 0.5), slot('a', 0.66, 0, 0.34, 0.25), slot('b', 0.66, 0.25, 0.34, 0.25), slot('c', 0, 0.5, 0.33, 0.5), slot('d', 0.33, 0.5, 0.34, 0.5), slot('e', 0.67, 0.5, 0.33, 0.5)] },

  gridTemplate('seven-grid', '七图网格', 7, 3, 7),
  gridTemplate('eight-grid', '八图网格', 8, 4, 7),
  { id: 'eight-magazine', name: '杂志八图', supportedImageCounts: [8], visualPriority: 10, slots: [slot('a', 0, 0, 0.5, 0.25), slot('b', 0.5, 0, 0.5, 0.25), slot('main', 0, 0.25, 0.5, 0.5), slot('c', 0.5, 0.25, 0.25, 0.25), slot('d', 0.75, 0.25, 0.25, 0.25), slot('e', 0.5, 0.5, 0.5, 0.25), slot('f', 0, 0.75, 0.5, 0.25), slot('g', 0.5, 0.75, 0.5, 0.25)] },
  { id: 'nine-grid', name: '3 x 3', supportedImageCounts: [9], visualPriority: 8, slots: Array.from({ length: 9 }, (_, index) => slot(String(index), (index % 3) / 3, Math.floor(index / 3) / 3, 1 / 3, 1 / 3)) },

  gridTemplate('ten-grid', '十图网格', 10, 5, 7),
  gridTemplate('twelve-grid', '12 宫格', 12, 3, 9),
  gridTemplate('twelve-4x3', '4 x 3', 12, 4, 8),
  gridTemplate('twelve-long', '十二段长图', 12, 2, 7),
  { id: 'twelve-center', name: '中心主图', supportedImageCounts: [12], visualPriority: 10, slots: [slot('a', 0, 0, 0.25, 0.25), slot('b', 0.25, 0, 0.25, 0.25), slot('c', 0.5, 0, 0.25, 0.25), slot('d', 0.75, 0, 0.25, 0.25), slot('e', 0, 0.25, 0.25, 0.25), slot('main', 0.25, 0.25, 0.5, 0.5), slot('f', 0.75, 0.25, 0.25, 0.25), slot('g', 0, 0.5, 0.25, 0.25), slot('h', 0.75, 0.5, 0.25, 0.25), slot('i', 0, 0.75, 0.25, 0.25), slot('j', 0.25, 0.75, 0.25, 0.25), slot('k', 0.5, 0.75, 0.25, 0.25)] },
  gridTemplate('sixteen-grid', '16 宫格', 16, 4, 8),
  gridTemplate('twenty-grid', '20 宫格', 20, 5, 8),
  stripTemplate('twenty-strip', '20 段长图', 20, 'column', 7),
]

export function filterTemplatesByImageCount(templates: CollageTemplate[], count: number) {
  const exact = templates.filter((template) => template.supportedImageCounts.includes(count) && template.slots.length >= count)
  if (exact.length > 0) return exact
  return templates.filter((template) => template.slots.length >= count).sort((a, b) => a.slots.length - b.slots.length)
}
