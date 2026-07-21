import type { CouplePosterTemplate } from '../types'

export const loveYouProfileCards: CouplePosterTemplate = {
  id: 'love-you-profile-cards',
  name: 'Love / You 资料卡',
  category: '资料卡',
  thumbnail: '',
  canvasWidth: 1080,
  canvasHeight: 1440,
  backgroundColor: '#f4f4f4',
  elements: [
    { id: 'card-a', type: 'shape', shape: 'rectangle', x: 80, y: 150, width: 920, height: 460, fill: '#ffffff', borderRadius: 48, opacity: 1, zIndex: 1 },
    { id: 'card-b', type: 'shape', shape: 'rectangle', x: 80, y: 760, width: 920, height: 460, fill: '#ffffff', borderRadius: 48, opacity: 1, zIndex: 1 },
    { id: 'small-a', type: 'image', source: 'avatarA', x: 135, y: 235, width: 140, height: 140, shape: 'rounded-rectangle', borderRadius: 22, objectFit: 'cover', zIndex: 2 },
    { id: 'large-a', type: 'image', source: 'avatarB', x: 430, y: 205, width: 420, height: 320, shape: 'rounded-rectangle', borderRadius: 42, objectFit: 'cover', zIndex: 2 },
    { id: 'small-b', type: 'image', source: 'avatarB', x: 135, y: 845, width: 140, height: 140, shape: 'rounded-rectangle', borderRadius: 22, objectFit: 'cover', zIndex: 2 },
    { id: 'large-b', type: 'image', source: 'avatarA', x: 430, y: 815, width: 420, height: 320, shape: 'rounded-rectangle', borderRadius: 42, objectFit: 'cover', zIndex: 2 },
    { id: 'love', type: 'text', text: 'Love u', x: 115, y: 420, width: 230, fontSize: 52, fontFamily: '"Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 7, shadowOffsetY: 4, editable: true, zIndex: 3 },
    { id: 'you', type: 'text', text: 'Miss u', x: 115, y: 1030, width: 230, fontSize: 52, fontFamily: '"Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 7, shadowOffsetY: 4, editable: true, zIndex: 3 },
    { id: 'status-a', type: 'text', text: '小叮', x: 145, y: 500, width: 170, fontSize: 22, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 400, color: '#9a9a9a', textAlign: 'center', letterSpacing: 2, editable: true, zIndex: 3 },
    { id: 'status-b', type: 'text', text: '阿棠', x: 145, y: 1110, width: 170, fontSize: 22, fontFamily: 'STXingkai, KaiTi, "Microsoft YaHei", serif', fontWeight: 400, color: '#9a9a9a', textAlign: 'center', letterSpacing: 2, editable: true, zIndex: 3 },
  ],
}
