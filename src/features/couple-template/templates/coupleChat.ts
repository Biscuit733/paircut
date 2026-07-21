import type { CouplePosterTemplate } from '../types'

export const coupleChat: CouplePosterTemplate = {
  id: 'couple-chat',
  name: '聊天界面展示',
  category: '聊天展示',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#f2f1ec',
  elements: [
    { id: 'header', type: 'shape', shape: 'rectangle', x: 0, y: 0, width: 1080, height: 150, fill: '#ffffff', zIndex: 1 },
    { id: 'chat-title', type: 'text', text: '一丁点甜', x: 250, y: 52, width: 580, fontSize: 44, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 500, color: '#171717', textAlign: 'center', letterSpacing: 4, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 7, shadowOffsetY: 4, editable: true, zIndex: 2 },
    { id: 'avatar-a', type: 'image', source: 'avatarA', x: 95, y: 235, width: 128, height: 128, shape: 'circle', objectFit: 'cover', zIndex: 3 },
    { id: 'bubble-a', type: 'shape', shape: 'rectangle', x: 250, y: 235, width: 500, height: 128, fill: '#ffffff', borderRadius: 24, zIndex: 2 },
    { id: 'text-a', type: 'text', text: '阿棠阿棠，我是小叮', x: 285, y: 278, width: 430, fontSize: 30, fontFamily: 'sans-serif', fontWeight: 400, color: '#171717', textAlign: 'left', editable: true, zIndex: 4 },
    { id: 'avatar-b', type: 'image', source: 'avatarB', x: 860, y: 475, width: 128, height: 128, shape: 'circle', objectFit: 'cover', zIndex: 3 },
    { id: 'bubble-b', type: 'shape', shape: 'rectangle', x: 325, y: 475, width: 500, height: 128, fill: '#ffe2e2', borderRadius: 24, zIndex: 2 },
    { id: 'text-b', type: 'text', text: '小叮小叮，阿棠收到！', x: 365, y: 518, width: 420, fontSize: 30, fontFamily: 'sans-serif', fontWeight: 400, color: '#171717', textAlign: 'right', editable: true, zIndex: 4 },
    { id: 'text-c', type: 'text', text: '', x: 250, y: 830, width: 580, fontSize: 44, fontFamily: 'serif', fontWeight: 400, color: '#171717', textAlign: 'center', editable: true, visible: false, zIndex: 4 },
  ],
}
