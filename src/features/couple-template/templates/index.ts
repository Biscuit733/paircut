import type { CouplePosterTemplate } from '../types'
import { originalDoubleCircleDark } from './originalDoubleCircleDark'
import { originalDoubleSquareLight } from './originalDoubleSquareLight'
import { loveYouProfileCards } from './loveYouProfileCards'
import { coupleChat } from './coupleChat'
import { minimalCoupleCards } from './minimalCoupleCards'
import { xiaohongshuShare } from './xiaohongshuShare'

export const couplePosterTemplates: CouplePosterTemplate[] = [
  originalDoubleCircleDark,
  originalDoubleSquareLight,
  loveYouProfileCards,
  coupleChat,
  minimalCoupleCards,
  xiaohongshuShare,
]

export const templateCategories = Array.from(new Set(couplePosterTemplates.map((template) => template.category)))

