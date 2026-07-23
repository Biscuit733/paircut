import type { CouplePosterTemplate } from '../types'

export const xiaohongshuShare: CouplePosterTemplate = {
  id: 'xiaohongshu-share',
  name: '发布分享图',
  category: '小红书发布图',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1060,
  backgroundColor: '#ffffff',
  elements: [
    { id: 'title', type: 'text', text: '一丁点甜', x: 88, y: 58, width: 900, fontSize: 64, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#171717', textAlign: 'left', letterSpacing: 3, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 9, shadowOffsetY: 5, editable: true, zIndex: 2 },
    { id: 'subtitle', type: 'text', text: 'Biscuit  /  小叮  /  阿棠', x: 88, y: 142, width: 900, fontSize: 32, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#737373', textAlign: 'left', letterSpacing: 2, editable: true, zIndex: 2 },
    { id: 'original-image', type: 'image', source: 'original', x: 88, y: 210, width: 904, height: 520, shape: 'rounded-rectangle', borderRadius: 32, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 20, shadowOffsetY: 10, objectFit: 'cover', zIndex: 1 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 190, y: 790, width: 230, height: 230, shape: 'rounded-rectangle', borderRadius: 30, shadowColor: 'rgba(0,0,0,0.18)', shadowBlur: 18, shadowOffsetY: 10, objectFit: 'cover', zIndex: 2 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 660, y: 790, width: 230, height: 230, shape: 'rounded-rectangle', borderRadius: 30, shadowColor: 'rgba(0,0,0,0.18)', shadowBlur: 18, shadowOffsetY: 10, objectFit: 'cover', zIndex: 2 },
    { id: 'note', type: 'text', text: 'Biscuit 头像工坊', x: 88, y: 1022, width: 900, fontSize: 28, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#737373', textAlign: 'center', letterSpacing: 1, editable: true, zIndex: 3 },
  ],
}
