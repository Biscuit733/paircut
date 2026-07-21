import type { CollageImageAsset, CollageTemplate, SmartLayoutResult } from '../types'
import { classifyImageRatio } from '../../../utils/image'
import { filterTemplatesByImageCount } from '../templates/templates'

function slotRatio(slot: CollageTemplate['slots'][number], canvasRatio: number) {
  return (slot.width * canvasRatio) / slot.height
}

function ratioLoss(imageRatio: number, targetRatio: number) {
  return Math.abs(Math.log(imageRatio / targetRatio))
}

export function recommendLayout(images: CollageImageAsset[], canvasRatio: number, templates: CollageTemplate[]): SmartLayoutResult {
  const candidates = filterTemplatesByImageCount(templates, images.length)
  if (candidates.length === 0) {
    return { templateId: templates[0]?.id ?? '', score: 0, assignments: [] }
  }
  const rankedImages = [...images].sort((a, b) => b.width * b.height - a.width * a.height)
  let best: SmartLayoutResult | null = null
  for (const template of candidates) {
    const slots = template.slots.slice(0, images.length).sort((a, b) => b.width * b.height - a.width * a.height)
    const assignments = rankedImages.map((image, index) => ({ imageId: image.id, slotId: slots[index]?.id ?? slots[0].id }))
    const loss = assignments.reduce((total, assignment) => {
      const image = images.find((item) => item.id === assignment.imageId)
      const slot = template.slots.find((item) => item.id === assignment.slotId)
      if (!image || !slot) return total
      const kindBias = classifyImageRatio(image.aspectRatio) === classifyImageRatio(slotRatio(slot, canvasRatio)) ? -0.04 : 0.08
      return total + ratioLoss(image.aspectRatio, slotRatio(slot, canvasRatio)) + kindBias
    }, 0)
    const score = Math.max(0, 100 - loss * 26 + template.visualPriority * 1.5)
    if (!best || score > best.score) best = { templateId: template.id, score, assignments }
  }
  return best ?? { templateId: candidates[0].id, score: 0, assignments: [] }
}

