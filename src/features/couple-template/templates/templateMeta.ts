export type TemplateMeta = {
  description: string
  usage: string
  tone: string
}

const templateMeta: Record<string, TemplateMeta> = {
  'original-double-circle-dark': {
    description: '大图氛围感最强，适合先出一张主视觉。',
    usage: '头像套装封面',
    tone: '夜色 / 高对比',
  },
  'dark-profile-showcase': {
    description: '信息层级更完整，适合展示系列、角色和署名。',
    usage: '资料展示',
    tone: '深色 / 账号感',
  },
  'original-double-square-light': {
    description: '保留原图空间，头像和名字都比较清爽。',
    usage: '双头像预览',
    tone: '浅色 / 干净',
  },
  'love-you-profile-cards': {
    description: '像两张小卡片叠在一起，适合甜一点的组合。',
    usage: '关系卡',
    tone: '留白 / 手写',
  },
  'couple-chat': {
    description: '带一点聊天记录和动态感，适合做日常片段。',
    usage: '聊天页',
    tone: '日常 / 故事',
  },
  'minimal-couple-cards': {
    description: '结构简单醒目，适合快速产出一张封面图。',
    usage: '极简海报',
    tone: '大字 / 利落',
  },
  'xiaohongshu-share': {
    description: '偏发布页构图，标题和副标题都很显眼。',
    usage: '小红书封面',
    tone: '发布 / 清晰',
  },
  'xhs-cute-post': {
    description: '头像、原图和短标题组合，更像一张可爱帖子。',
    usage: '帖子展示',
    tone: '可爱 / 轻分享',
  },
  'winter-moments-chat': {
    description: '聊天气泡和资料区结合，适合做系列日常。',
    usage: '朋友圈感',
    tone: '柔和 / 记录',
  },
  'handdraw-avatar-set': {
    description: '像手账拼贴，适合展示原图和头像组。',
    usage: '头像组',
    tone: '手绘 / 松弛',
  },
}

export function getTemplateMeta(templateId: string): TemplateMeta {
  return templateMeta[templateId] ?? {
    description: '适合快速生成一张头像展示图。',
    usage: '模板图',
    tone: '通用',
  }
}
