import type { CouplePosterTemplate, CoupleTemplateElement } from '../types'

export function cloneTemplate(template: CouplePosterTemplate): CouplePosterTemplate {
  return structuredClone(template)
}

export function sortedElements(elements: CoupleTemplateElement[]) {
  return [...elements].filter((element) => element.visible !== false).sort((a, b) => a.zIndex - b.zIndex)
}

export function scaleElement<T extends CoupleTemplateElement>(element: T, scaleX: number, scaleY: number): T {
  return {
    ...element,
    x: element.x * scaleX,
    y: element.y * scaleY,
    width: element.width * scaleX,
    height: ((element.height ?? ('fontSize' in element ? element.fontSize * 1.4 : 0)) * scaleY),
  }
}
