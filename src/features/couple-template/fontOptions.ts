export type TemplateFontOption = {
  label: string
  value: string
  group: '可爱英文' | '手写签名' | '中文常用' | '基础字体'
}

export const templateFontOptions: TemplateFontOption[] = [
  { group: '可爱英文', label: 'Fredoka 圆滚滚', value: '"Fredoka", "Microsoft YaHei", sans-serif' },
  { group: '可爱英文', label: 'Baloo 2 软糖', value: '"Baloo 2", "Microsoft YaHei", sans-serif' },
  { group: '可爱英文', label: 'Comic Neue 漫画', value: '"Comic Neue", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Bubblegum Sans 泡泡糖', value: '"Bubblegum Sans", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Chewy 糯糯字', value: '"Chewy", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Sniglet 圆角', value: '"Sniglet", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Short Stack 手账', value: '"Short Stack", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Patrick Hand 笔记', value: '"Patrick Hand", "Microsoft YaHei", cursive' },
  { group: '可爱英文', label: 'Luckiest Guy 厚标题', value: '"Luckiest Guy", "Arial Black", "Microsoft YaHei", sans-serif' },
  { group: '手写签名', label: 'Pacifico 甜甜签名', value: '"Pacifico", "Great Vibes", cursive' },
  { group: '手写签名', label: 'Great Vibes 高级花体', value: '"Great Vibes", "Parisienne", cursive' },
  { group: '手写签名', label: 'Parisienne 轻盈签名', value: '"Parisienne", "Great Vibes", cursive' },
  { group: '手写签名', label: 'Dancing Script 自然手写', value: '"Dancing Script", "Trebuchet MS", cursive' },
  { group: '中文常用', label: '圆润中文', value: 'YouYuan, "Microsoft YaHei", sans-serif' },
  { group: '基础字体', label: '酷黑标题', value: '"Arial Black", Impact, "Microsoft YaHei", sans-serif' },
  { group: '基础字体', label: '复古衬线', value: 'serif' },
  { group: '基础字体', label: '简洁黑体', value: 'sans-serif' },
]

export const templateFontGroups = Array.from(new Set(templateFontOptions.map((option) => option.group)))
