import type { CouplePosterTemplate } from '../types'

export const darkProfileShowcase: CouplePosterTemplate = {
  id: 'dark-profile-showcase',
  name: '深色资料展示',
  category: '原图展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1180,
  backgroundColor: '#ffffff',
  elements: [
    { id: 'top-bar', type: 'shape', shape: 'rectangle', x: 0, y: 0, width: 1080, height: 110, fill: '#ffffff', zIndex: 1 },
    { id: 'profile-dot', type: 'image', source: 'avatarB', x: 124, y: 32, width: 58, height: 58, shape: 'circle', borderWidth: 2, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.18)', shadowBlur: 12, shadowOffsetY: 4, objectFit: 'cover', zIndex: 3 },
    { id: 'account-name', type: 'text', text: 'Biscuit', x: 205, y: 38, width: 440, fontSize: 38, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 600, color: '#171717', textAlign: 'left', editable: true, zIndex: 3 },
    { id: 'top-note', type: 'text', text: '情头工坊', x: 770, y: 42, width: 180, fontSize: 25, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#8a8a8a', textAlign: 'right', editable: true, zIndex: 3 },
    { id: 'hero', type: 'image', source: 'original', x: 0, y: 110, width: 1080, height: 560, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'hero-watermark', type: 'text', text: 'Biscuit', x: 260, y: 360, width: 560, fontSize: 64, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.40)', textAlign: 'center', letterSpacing: 2, editable: true, zIndex: 2 },
    { id: 'dark-panel', type: 'shape', shape: 'rectangle', x: 0, y: 670, width: 1080, height: 300, fill: '#11171d', zIndex: 2 },
    { id: 'square-avatar', type: 'image', source: 'avatarA', x: 72, y: 735, width: 230, height: 230, shape: 'rounded-rectangle', borderRadius: 10, borderWidth: 2, borderColor: '#20262d', shadowColor: 'rgba(0,0,0,0.46)', shadowBlur: 26, shadowOffsetY: 12, objectFit: 'cover', zIndex: 4 },
    { id: 'circle-avatar', type: 'image', source: 'avatarB', x: 750, y: 590, width: 220, height: 220, shape: 'circle', borderWidth: 5, borderColor: '#1b2229', shadowColor: 'rgba(0,0,0,0.48)', shadowBlur: 28, shadowOffsetY: 14, objectFit: 'cover', zIndex: 5 },
    { id: 'name', type: 'text', text: '一丁点甜', x: 350, y: 725, width: 360, fontSize: 56, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#ffffff', textAlign: 'left', shadowColor: 'rgba(255,255,255,0.18)', shadowBlur: 8, shadowOffsetY: 3, editable: true, zIndex: 4 },
    { id: 'seal', type: 'text', text: 'Biscuit', x: 360, y: 810, width: 260, fontSize: 58, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 700, color: '#ffffff', textAlign: 'left', editable: true, zIndex: 4 },
    { id: 'code', type: 'text', text: '小叮  /  阿棠', x: 650, y: 828, width: 360, fontSize: 36, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#ffffff', textAlign: 'left', letterSpacing: 3, editable: true, zIndex: 4 },
    { id: 'pager-a', type: 'shape', shape: 'circle', x: 482, y: 1008, width: 16, height: 16, fill: '#ff335c', zIndex: 5 },
    { id: 'pager-b', type: 'shape', shape: 'circle', x: 512, y: 1008, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
    { id: 'pager-c', type: 'shape', shape: 'circle', x: 542, y: 1008, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
    { id: 'quote', type: 'text', text: 'Biscuit 的一丁点甜日常', x: 80, y: 1050, width: 920, fontSize: 36, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#333333', textAlign: 'center', editable: true, zIndex: 5 },
  ],
}
