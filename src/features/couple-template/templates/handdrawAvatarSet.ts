import type { CouplePosterTemplate } from '../types'

export const handdrawAvatarSet: CouplePosterTemplate = {
  id: 'handdraw-avatar-set',
  name: '手绘头像组',
  category: '原图展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1120,
  backgroundColor: '#ffffff',
  elements: [
    { id: 'hero', type: 'image', source: 'original', x: 0, y: 0, width: 1080, height: 500, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'floating-card', type: 'image', source: 'avatarB', x: 735, y: 390, width: 210, height: 210, shape: 'circle', borderWidth: 4, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.24)', shadowBlur: 20, shadowOffsetY: 10, objectFit: 'cover', zIndex: 4 },
    { id: 'white-panel', type: 'shape', shape: 'rectangle', x: 0, y: 500, width: 1080, height: 620, fill: '#ffffff', zIndex: 1 },
    { id: 'mini-a', type: 'image', source: 'avatarA', x: 104, y: 630, width: 132, height: 132, shape: 'rounded-rectangle', borderRadius: 14, borderWidth: 2, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 14, shadowOffsetY: 7, objectFit: 'cover', zIndex: 3 },
    { id: 'by', type: 'text', text: 'Biscuit', x: 300, y: 628, width: 560, fontSize: 48, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 700, color: '#2a2a2a', textAlign: 'left', letterSpacing: 1, editable: true, zIndex: 3 },
    { id: 'line', type: 'text', text: '生活里的小甜瞬间', x: 300, y: 704, width: 650, fontSize: 36, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#333333', textAlign: 'left', letterSpacing: 3, editable: true, zIndex: 3 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 126, y: 800, width: 292, height: 292, shape: 'rounded-rectangle', borderRadius: 18, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 18, shadowOffsetY: 10, objectFit: 'cover', zIndex: 3 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 662, y: 800, width: 292, height: 292, shape: 'rounded-rectangle', borderRadius: 18, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 18, shadowOffsetY: 10, objectFit: 'cover', zIndex: 3 },
    { id: 'pager-a', type: 'shape', shape: 'circle', x: 486, y: 1054, width: 16, height: 16, fill: '#ff335c', zIndex: 5 },
    { id: 'pager-b', type: 'shape', shape: 'circle', x: 516, y: 1054, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
    { id: 'pager-c', type: 'shape', shape: 'circle', x: 546, y: 1054, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
  ],
}
