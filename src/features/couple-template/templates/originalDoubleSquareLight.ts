import type { CouplePosterTemplate } from '../types'

export const originalDoubleSquareLight: CouplePosterTemplate = {
  id: 'original-double-square-light',
  name: '浅色双格',
  category: '双人头像',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1080,
  backgroundColor: '#f7f2ea',
  elements: [
    { id: 'original-image', type: 'image', source: 'original', x: 0, y: 0, width: 1080, height: 640, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'panel', type: 'shape', shape: 'rectangle', x: 0, y: 640, width: 1080, height: 440, fill: '#f7f2ea', zIndex: 2 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 180, y: 710, width: 260, height: 260, shape: 'rounded-rectangle', borderRadius: 30, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 22, shadowOffsetY: 12, objectFit: 'cover', zIndex: 3 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 640, y: 710, width: 260, height: 260, shape: 'rounded-rectangle', borderRadius: 30, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 22, shadowOffsetY: 12, objectFit: 'cover', zIndex: 3 },
    { id: 'label-a', type: 'text', text: '小叮', x: 145, y: 990, width: 330, fontSize: 44, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 4 },
    { id: 'label-b', type: 'text', text: '阿棠', x: 605, y: 990, width: 330, fontSize: 44, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 4 },
  ],
}
