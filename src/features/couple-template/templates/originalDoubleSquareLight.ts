import type { CouplePosterTemplate } from '../types'

export const originalDoubleSquareLight: CouplePosterTemplate = {
  id: 'original-double-square-light',
  name: '浅色双格',
  category: '双人头像',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#f7f2ea',
  elements: [
    { id: 'original-image', type: 'image', source: 'original', x: 0, y: 0, width: 1080, height: 810, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'panel', type: 'shape', shape: 'rectangle', x: 0, y: 810, width: 1080, height: 630, fill: '#f7f2ea', zIndex: 2 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 145, y: 900, width: 330, height: 330, shape: 'rounded-rectangle', borderRadius: 36, borderWidth: 3, borderColor: '#ffffff', objectFit: 'cover', zIndex: 3 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 605, y: 900, width: 330, height: 330, shape: 'rounded-rectangle', borderRadius: 36, borderWidth: 3, borderColor: '#ffffff', objectFit: 'cover', zIndex: 3 },
    { id: 'label-a', type: 'text', text: '小叮', x: 145, y: 1268, width: 330, fontSize: 50, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 4 },
    { id: 'label-b', type: 'text', text: '阿棠', x: 605, y: 1268, width: 330, fontSize: 50, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 4 },
  ],
}
