import type { CouplePosterTemplate } from '../types'

export const originalDoubleCircleDark: CouplePosterTemplate = {
  id: 'original-double-circle-dark',
  name: '夜色双圆',
  category: '原图展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#050505',
  elements: [
    { id: 'original-image', type: 'image', source: 'original', x: 0, y: 0, width: 1080, height: 810, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 160, y: 700, width: 300, height: 300, shape: 'circle', borderWidth: 4, borderColor: '#ffffff', objectFit: 'cover', zIndex: 3 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 620, y: 700, width: 300, height: 300, shape: 'circle', borderWidth: 4, borderColor: '#ffffff', objectFit: 'cover', zIndex: 3 },
    { id: 'title', type: 'text', text: '一丁点甜', x: 120, y: 1068, width: 840, fontSize: 82, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#ffffff', textAlign: 'center', letterSpacing: 6, shadowColor: 'rgba(255,255,255,0.24)', shadowBlur: 12, shadowOffsetY: 5, editable: true, zIndex: 4 },
    { id: 'subtitle', type: 'text', text: '小叮    阿棠', x: 190, y: 1195, width: 700, fontSize: 38, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 400, color: '#f4f4f4', textAlign: 'center', letterSpacing: 12, shadowColor: 'rgba(255,255,255,0.18)', shadowBlur: 8, shadowOffsetY: 3, editable: true, zIndex: 4 },
  ],
}
