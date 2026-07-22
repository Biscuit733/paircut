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
    { id: 'card-a', type: 'shape', shape: 'rectangle', x: 82, y: 74, width: 726, height: 430, fill: '#ffffff', borderRadius: 42, opacity: 1, shadowColor: 'rgba(0,0,0,0.10)', shadowBlur: 26, shadowOffsetY: 16, zIndex: 1 },
    { id: 'card-b', type: 'shape', shape: 'rectangle', x: 82, y: 616, width: 726, height: 430, fill: '#ffffff', borderRadius: 42, opacity: 1, shadowColor: 'rgba(0,0,0,0.10)', shadowBlur: 26, shadowOffsetY: 16, zIndex: 1 },
    { id: 'small-a', type: 'image', source: 'avatarA', x: 132, y: 136, width: 138, height: 138, shape: 'rounded-rectangle', borderRadius: 24, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 14, shadowOffsetY: 7, objectFit: 'cover', zIndex: 2 },
    { id: 'large-a', type: 'image', source: 'avatarB', x: 370, y: 112, width: 340, height: 340, shape: 'rounded-rectangle', borderRadius: 44, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 20, shadowOffsetY: 10, objectFit: 'cover', zIndex: 2 },
    { id: 'small-b', type: 'image', source: 'avatarB', x: 132, y: 678, width: 138, height: 138, shape: 'rounded-rectangle', borderRadius: 24, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 14, shadowOffsetY: 7, objectFit: 'cover', zIndex: 2 },
    { id: 'large-b', type: 'image', source: 'avatarA', x: 370, y: 654, width: 340, height: 340, shape: 'rounded-rectangle', borderRadius: 44, borderWidth: 3, borderColor: '#ffffff', shadowColor: 'rgba(0,0,0,0.16)', shadowBlur: 20, shadowOffsetY: 10, objectFit: 'cover', zIndex: 2 },
    { id: 'love', type: 'text', text: 'Love', x: 112, y: 306, width: 250, fontSize: 82, fontFamily: '"Great Vibes", "Parisienne", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.06)', shadowBlur: 4, shadowOffsetY: 2, editable: true, zIndex: 3 },
    { id: 'you', type: 'text', text: 'You', x: 112, y: 848, width: 250, fontSize: 84, fontFamily: '"Great Vibes", "Parisienne", cursive', fontWeight: 400, color: '#171717', textAlign: 'center', letterSpacing: 0, shadowColor: 'rgba(0,0,0,0.06)', shadowBlur: 4, shadowOffsetY: 2, editable: true, zIndex: 3 },
    { id: 'label-a', type: 'text', text: '小叮', x: 132, y: 420, width: 138, fontSize: 22, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#8a8a8a', textAlign: 'center', editable: true, zIndex: 3 },
    { id: 'label-b', type: 'text', text: '阿棠', x: 132, y: 962, width: 138, fontSize: 22, fontFamily: '"Microsoft YaHei", sans-serif', fontWeight: 500, color: '#8a8a8a', textAlign: 'center', editable: true, zIndex: 3 },
  ],
}
