import type { CouplePosterTemplate } from '../types'

export const originalDoubleCircleDark: CouplePosterTemplate = {
  id: 'original-double-circle-dark',
  name: '夜色双圆',
  category: '原图展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1120,
  backgroundColor: '#050505',
  elements: [
    { id: 'original-image', type: 'image', source: 'original', x: 0, y: 0, width: 1080, height: 650, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 185, y: 565, width: 270, height: 270, shape: 'circle', borderWidth: 5, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.48)', shadowBlur: 32, shadowOffsetY: 16, objectFit: 'cover', zIndex: 3 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 625, y: 565, width: 270, height: 270, shape: 'circle', borderWidth: 5, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.48)', shadowBlur: 32, shadowOffsetY: 16, objectFit: 'cover', zIndex: 3 },
    { id: 'title', type: 'text', text: 'Biscuit', x: 120, y: 870, width: 840, fontSize: 92, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 700, color: '#ffffff', textAlign: 'center', letterSpacing: 2, shadowColor: 'rgba(255,255,255,0.28)', shadowBlur: 14, shadowOffsetY: 5, editable: true, zIndex: 4 },
    { id: 'subtitle', type: 'text', text: '一丁点甜', x: 190, y: 990, width: 700, fontSize: 36, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#f4f4f4', textAlign: 'center', letterSpacing: 8, shadowColor: 'rgba(255,255,255,0.18)', shadowBlur: 8, shadowOffsetY: 3, editable: true, zIndex: 4 },
  ],
}
