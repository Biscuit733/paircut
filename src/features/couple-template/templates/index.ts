import type { CouplePosterTemplate } from '../types'
import { originalDoubleCircleDark } from './originalDoubleCircleDark'
import { originalDoubleSquareLight } from './originalDoubleSquareLight'
import { loveYouProfileCards } from './loveYouProfileCards'
import { coupleChat } from './coupleChat'
import { minimalCoupleCards } from './minimalCoupleCards'
import { xiaohongshuShare } from './xiaohongshuShare'
import { xhsCutePost } from './xhsCutePost'
import { darkProfileShowcase } from './darkProfileShowcase'
import { winterMomentsChat } from './winterMomentsChat'
import { handdrawAvatarSet } from './handdrawAvatarSet'

export const couplePosterTemplates: CouplePosterTemplate[] = [
  originalDoubleCircleDark,
  darkProfileShowcase,
  originalDoubleSquareLight,
  loveYouProfileCards,
  coupleChat,
  minimalCoupleCards,
  xiaohongshuShare,
  xhsCutePost,
  winterMomentsChat,
  handdrawAvatarSet,
]

export const templateCategories = Array.from(new Set(couplePosterTemplates.map((template) => template.category)))
