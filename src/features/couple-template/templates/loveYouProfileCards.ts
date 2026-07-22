import type { CouplePosterTemplate } from '../types'

export const loveYouProfileCards: CouplePosterTemplate = {
  id: 'love-you-profile-cards',
  name: 'Love / You 资料卡',
  category: '资料卡',
  thumbnail: '',
  canvasWidth: 890,
  canvasHeight: 1120,
  backgroundColor: '#f4f4f4',
  elements: [
    { id: 'card-a', type: 'shape', shape: 'rectangle', x: 80, y: 70, width: 735, height: 440, fill: '#ffffff', borderRadius: 42, opacity: 1, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 28, shadowOffsetY: 18, zIndex: 1 },
    { id: 'card-b', type: 'shape', shape: 'rectangle', x: 80, y: 610, width: 735, height: 440, fill: '#ffffff', borderRadius: 42, opacity: 1, shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 28, shadowOffsetY: 18, zIndex: 1 },
    { id: 'small-a', type: 'image', source: 'avatarA', x: 132, y: 135, width: 150, height: 150, shape: 'rounded-rectangle', borderRadius: 26, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.20)', shadowBlur: 16, shadowOffsetY: 8, objectFit: 'cover', zIndex: 2 },
    { id: 'large-a', type: 'image', source: 'avatarB', x: 355, y: 105, width: 370, height: 370, shape: 'rounded-rectangle', borderRadius: 50, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.18)', shadowBlur: 22, shadowOffsetY: 12, objectFit: 'cover', zIndex: 2 },
    { id: 'small-b', type: 'image', source: 'avatarB', x: 132, y: 675, width: 150, height: 150, shape: 'rounded-rectangle', borderRadius: 26, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.20)', shadowBlur: 16, shadowOffsetY: 8, objectFit: 'cover', zIndex: 2 },
    { id: 'large-b', type: 'image', source: 'avatarA', x: 355, y: 645, width: 370, height: 370, shape: 'rounded-rectangle', borderRadius: 50, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.18)', shadowBlur: 22, shadowOffsetY: 12, objectFit: 'cover', zIndex: 2 },
    { id: 'love', type: 'text', text: 'Love', x: 112, y: 305, width: 270, fontSize: 88, fontFamily: '"Great Vibes", "Parisienne", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.08)', shadowBlur: 5, shadowOffsetY: 3, editable: true, zIndex: 3 },
    { id: 'you', type: 'text', text: 'You', x: 112, y: 845, width: 270, fontSize: 92, fontFamily: '"Great Vibes", "Parisienne", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.08)', shadowBlur: 5, shadowOffsetY: 3, editable: true, zIndex: 3 },
    { id: 'status-pill-a', type: 'shape', shape: 'rectangle', x: 155, y: 404, width: 125, height: 46, fill: '#ffffff', stroke: '#eeeeee', strokeWidth: 2, borderRadius: 24, shadowColor: 'rgba(0,0,0,0.07)', shadowBlur: 10, shadowOffsetY: 5, zIndex: 2 },
    { id: 'more-pill-a', type: 'shape', shape: 'circle', x: 295, y: 402, width: 50, height: 50, fill: '#ffffff', stroke: '#eeeeee', strokeWidth: 2, shadowColor: 'rgba(0,0,0,0.07)', shadowBlur: 10, shadowOffsetY: 5, zIndex: 2 },
    { id: 'status-a', type: 'text', text: '+ 状态', x: 155, y: 413, width: 125, fontSize: 24, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 400, color: '#8a8a8a', textAlign: 'center', letterSpacing: 1, editable: true, zIndex: 3 },
    { id: 'more-a', type: 'text', text: '...', x: 295, y: 408, width: 50, fontSize: 28, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 700, color: '#9a9a9a', textAlign: 'center', editable: true, zIndex: 3 },
    { id: 'status-pill-b', type: 'shape', shape: 'rectangle', x: 155, y: 944, width: 125, height: 46, fill: '#ffffff', stroke: '#eeeeee', strokeWidth: 2, borderRadius: 24, shadowColor: 'rgba(0,0,0,0.07)', shadowBlur: 10, shadowOffsetY: 5, zIndex: 2 },
    { id: 'more-pill-b', type: 'shape', shape: 'circle', x: 295, y: 942, width: 50, height: 50, fill: '#ffffff', stroke: '#eeeeee', strokeWidth: 2, shadowColor: 'rgba(0,0,0,0.07)', shadowBlur: 10, shadowOffsetY: 5, zIndex: 2 },
    { id: 'status-b', type: 'text', text: '+ 状态', x: 155, y: 953, width: 125, fontSize: 24, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 400, color: '#8a8a8a', textAlign: 'center', letterSpacing: 1, editable: true, zIndex: 3 },
    { id: 'more-b', type: 'text', text: '...', x: 295, y: 948, width: 50, fontSize: 28, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 700, color: '#9a9a9a', textAlign: 'center', editable: true, zIndex: 3 },
  ],
}
