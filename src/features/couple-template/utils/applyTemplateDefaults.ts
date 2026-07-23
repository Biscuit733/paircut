import type { WorkshopSettings } from '../../workshop-settings/types'
import type { CouplePosterTemplate, CoupleTemplateElement } from '../types'
import { cloneTemplate } from './scaleTemplate'

const builtInCreatorName = 'Biscuit'
const builtInThemeSeries = '一丁点甜'

export function applyTemplateDefaults(template: CouplePosterTemplate, settings: WorkshopSettings, previousSettings?: WorkshopSettings): CouplePosterTemplate {
  const previousCreatorName = previousSettings?.creatorName.trim() || builtInCreatorName
  const previousThemeSeries = previousSettings?.themeSeries.trim() || builtInThemeSeries
  const clonedTemplate = cloneTemplate(template)

  return {
    ...clonedTemplate,
    elements: clonedTemplate.elements.map((element) => applyElementDefaults(element, settings, previousCreatorName, previousThemeSeries)),
  }
}

function applyElementDefaults(
  element: CoupleTemplateElement,
  settings: WorkshopSettings,
  previousCreatorName: string,
  previousThemeSeries: string,
): CoupleTemplateElement {
  if (element.type !== 'text') return { ...element }
  return {
    ...element,
    text: applyTextDefaults(element.text, settings, previousCreatorName, previousThemeSeries),
  }
}

function applyTextDefaults(text: string, settings: WorkshopSettings, previousCreatorName: string, previousThemeSeries: string) {
  return text
    .replaceAll(`${previousCreatorName} 情头工坊`, `${settings.creatorName} 头像工坊`)
    .replaceAll(`${builtInCreatorName} 情头工坊`, `${settings.creatorName} 头像工坊`)
    .replaceAll('情头工坊', '头像工坊')
    .replaceAll(previousCreatorName, settings.creatorName)
    .replaceAll(builtInCreatorName, settings.creatorName)
    .replaceAll(previousThemeSeries, settings.themeSeries)
    .replaceAll(builtInThemeSeries, settings.themeSeries)
}
