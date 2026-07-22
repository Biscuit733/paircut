import type { CouplePosterTemplate } from '../types'

export const xhsCutePost: CouplePosterTemplate = {
  id: 'xhs-cute-post',
  name: '可爱帖子展示',
  category: '小红书发布图',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1080,
  backgroundColor: '#ffffff',
  elements: [
    { id: 'top-bar', type: 'shape', shape: 'rectangle', x: 0, y: 0, width: 1080, height: 110, fill: '#ffffff', zIndex: 1 },
    { id: 'profile-dot', type: 'image', source: 'avatarA', x: 126, y: 32, width: 54, height: 54, shape: 'circle', borderWidth: 2, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 12, shadowOffsetY: 4, objectFit: 'cover', zIndex: 3 },
    { id: 'account-name', type: 'text', text: 'Biscuit', x: 205, y: 35, width: 430, fontSize: 36, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 600, color: '#171717', textAlign: 'left', editable: true, zIndex: 3 },
    { id: 'brand-pill', type: 'shape', shape: 'rectangle', x: 760, y: 28, width: 188, height: 56, fill: '#ffffff', stroke: '#ff5f8a', strokeWidth: 3, borderRadius: 32, zIndex: 2 },
    { id: 'brand-text', type: 'text', text: '关注', x: 776, y: 41, width: 156, fontSize: 24, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#ff5f8a', textAlign: 'center', editable: true, zIndex: 3 },
    { id: 'original-image', type: 'image', source: 'original', x: 0, y: 110, width: 1080, height: 560, shape: 'rectangle', objectFit: 'cover', locked: true, zIndex: 1 },
    { id: 'watermark', type: 'text', text: 'Biscuit', x: 315, y: 320, width: 460, fontSize: 54, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 700, color: 'rgba(255,255,255,0.56)', textAlign: 'center', letterSpacing: 2, editable: true, zIndex: 2 },
    { id: 'white-panel', type: 'shape', shape: 'rectangle', x: 0, y: 670, width: 1080, height: 410, fill: '#ffffff', zIndex: 1 },
    { id: 'avatar-card-a', type: 'image', source: 'avatarA', x: 105, y: 600, width: 250, height: 250, shape: 'rounded-rectangle', borderRadius: 10, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.34)', shadowBlur: 26, shadowOffsetY: 14, objectFit: 'cover', zIndex: 4 },
    { id: 'avatar-card-b', type: 'image', source: 'avatarB', x: 725, y: 600, width: 250, height: 250, shape: 'rounded-rectangle', borderRadius: 10, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.34)', shadowBlur: 26, shadowOffsetY: 14, objectFit: 'cover', zIndex: 4 },
    { id: 'caption', type: 'text', text: '小叮和阿棠的一丁点甜', x: 230, y: 900, width: 620, fontSize: 30, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 600, color: '#3f3f3f', textAlign: 'center', letterSpacing: 3, editable: true, zIndex: 5 },
    { id: 'pager-a', type: 'shape', shape: 'circle', x: 482, y: 954, width: 16, height: 16, fill: '#ff335c', zIndex: 5 },
    { id: 'pager-b', type: 'shape', shape: 'circle', x: 512, y: 954, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
    { id: 'pager-c', type: 'shape', shape: 'circle', x: 542, y: 954, width: 16, height: 16, fill: '#d8d8d8', zIndex: 5 },
    { id: 'title', type: 'text', text: 'Biscuit  一丁点甜', x: 46, y: 995, width: 980, fontSize: 34, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 700, color: '#333333', textAlign: 'left', editable: true, zIndex: 5 },
    { id: 'body', type: 'text', text: '#Biscuit #一丁点甜 #小叮 #阿棠', x: 46, y: 1040, width: 990, fontSize: 26, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 400, color: '#1f4a6a', textAlign: 'left', lineHeight: 1.35, editable: true, zIndex: 5 },
  ],
}
