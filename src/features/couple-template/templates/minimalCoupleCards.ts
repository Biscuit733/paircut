import type { CouplePosterTemplate } from '../types'

export const minimalCoupleCards: CouplePosterTemplate = {
  id: 'minimal-couple-cards',
  name: '极简双人卡片',
  category: '简约海报',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#171717',
  elements: [
    { id: 'left-panel', type: 'shape', shape: 'rectangle', x: 70, y: 170, width: 450, height: 940, fill: '#f5f4f0', borderRadius: 46, zIndex: 1 },
    { id: 'right-panel', type: 'shape', shape: 'rectangle', x: 560, y: 170, width: 450, height: 940, fill: '#ffffff', borderRadius: 46, zIndex: 1 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 145, y: 305, width: 300, height: 300, shape: 'circle', objectFit: 'cover', zIndex: 2 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 635, y: 305, width: 300, height: 300, shape: 'circle', objectFit: 'cover', zIndex: 2 },
    { id: 'connector', type: 'text', text: '+', x: 495, y: 425, width: 90, fontSize: 82, fontFamily: '"Arial Black", Impact, sans-serif', fontWeight: 500, color: '#171717', textAlign: 'center', strokeColor: '#ffffff', strokeWidth: 3, shadowColor: 'rgba(0,0,0,0.22)', shadowBlur: 10, shadowOffsetY: 4, editable: true, zIndex: 3 },
    { id: 'name-a', type: 'text', text: '小叮', x: 130, y: 750, width: 330, fontSize: 54, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 3 },
    { id: 'name-b', type: 'text', text: '阿棠', x: 620, y: 750, width: 330, fontSize: 54, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 8, shadowOffsetY: 5, editable: true, zIndex: 3 },
    { id: 'footer', type: 'text', text: '一丁点甜', x: 220, y: 1232, width: 640, fontSize: 46, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#ffffff', textAlign: 'center', letterSpacing: 8, shadowColor: 'rgba(255,255,255,0.22)', shadowBlur: 10, shadowOffsetY: 4, editable: true, zIndex: 3 },
  ],
}
