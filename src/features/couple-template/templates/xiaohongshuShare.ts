import type { CouplePosterTemplate } from '../types'

export const xiaohongshuShare: CouplePosterTemplate = {
  id: 'xiaohongshu-share',
  name: '发布分享图',
  category: '小红书发布图',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#ffffff',
  elements: [
    { id: 'title', type: 'text', text: '一丁点甜', x: 88, y: 74, width: 900, fontSize: 68, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'left', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 9, shadowOffsetY: 5, editable: true, zIndex: 2 },
    { id: 'subtitle', type: 'text', text: '小叮  x  阿棠', x: 88, y: 168, width: 900, fontSize: 32, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 400, color: '#737373', textAlign: 'left', letterSpacing: 3, editable: true, zIndex: 2 },
    { id: 'original-image', type: 'image', source: 'original', x: 88, y: 260, width: 904, height: 678, shape: 'rounded-rectangle', borderRadius: 32, objectFit: 'cover', zIndex: 1 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 165, y: 1020, width: 300, height: 300, shape: 'rounded-rectangle', borderRadius: 34, objectFit: 'cover', zIndex: 2 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 615, y: 1020, width: 300, height: 300, shape: 'rounded-rectangle', borderRadius: 34, objectFit: 'cover', zIndex: 2 },
    { id: 'note', type: 'text', text: '#小叮 #阿棠 #情侣头像分享', x: 88, y: 1340, width: 900, fontSize: 28, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 400, color: '#737373', textAlign: 'left', letterSpacing: 2, editable: true, zIndex: 3 },
  ],
}
