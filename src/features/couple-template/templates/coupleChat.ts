import type { CouplePosterTemplate } from '../types'

export const coupleChat: CouplePosterTemplate = {
  id: 'couple-chat',
  name: '聊天界面展示',
  category: '聊天展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 900,
  backgroundColor: '#f2f1ec',
  elements: [
    { id: 'header', type: 'shape', shape: 'rectangle', x: 0, y: 0, width: 1080, height: 130, fill: '#ffffff', zIndex: 1 },
    { id: 'chat-title', type: 'text', text: 'Biscuit 小日常', x: 250, y: 42, width: 580, fontSize: 40, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 700, color: '#171717', textAlign: 'center', letterSpacing: 2, shadowColor: 'rgba(0,0,0,0.10)', shadowBlur: 6, shadowOffsetY: 3, editable: true, zIndex: 2 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 95, y: 205, width: 118, height: 118, shape: 'circle', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 12, shadowOffsetY: 6, objectFit: 'cover', zIndex: 3 },
    { id: 'bubble-a', type: 'shape', shape: 'rectangle', x: 245, y: 205, width: 525, height: 118, fill: '#ffffff', borderRadius: 24, zIndex: 2 },
    { id: 'text-a', type: 'text', text: '阿棠阿棠，我是小叮', x: 285, y: 244, width: 455, fontSize: 30, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#171717', textAlign: 'left', editable: true, zIndex: 4 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 868, y: 395, width: 118, height: 118, shape: 'circle', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 12, shadowOffsetY: 6, objectFit: 'cover', zIndex: 3 },
    { id: 'bubble-b', type: 'shape', shape: 'rectangle', x: 315, y: 395, width: 525, height: 118, fill: '#ffe2e2', borderRadius: 24, zIndex: 2 },
    { id: 'text-b', type: 'text', text: '小叮小叮，阿棠收到！', x: 355, y: 434, width: 445, fontSize: 30, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#171717', textAlign: 'right', editable: true, zIndex: 4 },
    { id: 'moments-title', type: 'text', text: 'Biscuit', x: 96, y: 610, width: 260, fontSize: 42, fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif', fontWeight: 600, color: '#171717', textAlign: 'left', editable: true, zIndex: 4 },
    { id: 'moment-profile', type: 'image', source: 'avatarA', x: 96, y: 675, width: 92, height: 92, shape: 'rounded-rectangle', borderRadius: 16, shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 12, shadowOffsetY: 7, objectFit: 'cover', zIndex: 4 },
    { id: 'moment-square-a', type: 'image', source: 'avatarA', x: 220, y: 655, width: 150, height: 150, shape: 'rounded-rectangle', borderRadius: 18, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 14, shadowOffsetY: 8, objectFit: 'cover', zIndex: 4 },
    { id: 'moment-square-b', type: 'image', source: 'avatarB', x: 395, y: 655, width: 150, height: 150, shape: 'rounded-rectangle', borderRadius: 18, shadowColor: 'rgba(0,0,0,0.14)', shadowBlur: 14, shadowOffsetY: 8, objectFit: 'cover', zIndex: 4 },
    { id: 'blank-a', type: 'shape', shape: 'rectangle', x: 570, y: 655, width: 150, height: 150, fill: '#ffffff', borderRadius: 18, stroke: '#eeeeee', strokeWidth: 2, shadowColor: 'rgba(0,0,0,0.08)', shadowBlur: 12, shadowOffsetY: 7, zIndex: 3 },
    { id: 'moments-note', type: 'text', text: '今天的一丁点甜，留给小叮和阿棠', x: 220, y: 820, width: 640, fontSize: 28, fontFamily: 'YouYuan, "Microsoft YaHei", sans-serif', fontWeight: 500, color: '#737373', textAlign: 'left', letterSpacing: 2, editable: true, zIndex: 4 },
  ],
}
