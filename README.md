# PairCut 情头工坊

PairCut 是一个浏览器本地运行的情侣头像裁剪、情头展示模板和智能拼图工具。图片不会上传服务器，原图只保存在当前浏览器内存中，适合处理 Midjourney 等工具生成的 4:3 情侣插画。

## 核心功能

- 情头裁剪：一张原图独立裁剪头像 A / 头像 B，支持圆形、正方形、长方形、缩放、旋转、翻转和辅助线。
- 单图裁剪：复用核心裁剪组件，导出单张头像或封面。
- 情头模板：配置驱动的发布海报模板，内置夜色双圆、浅色双格、资料卡、聊天展示、极简双人卡片、发布分享图。
- 智能拼图：多图上传、模板选择、图片排序、智能布局推荐、单格偏移缩放和拼图导出。
- 导出：PNG / JPG / WebP，情侣头像支持一键 ZIP，包含原图、A/B 头像、组合预览、模板图和 export-info.json。
- 测试：Vitest 覆盖文件名清理、图片比例分类、拼图模板筛选、智能布局评分、输出尺寸、圆形遮罩和裁剪边界。

## 技术栈

React、Vite、TypeScript、Tailwind CSS、react-easy-crop、Fabric.js、JSZip、lucide-react、Zustand、Canvas API、Vitest。

## 安装

```bash
npm install
```

## 启动

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 检查

```bash
npm run lint
npm run test
```

## 项目目录

```text
src/
├── app/
├── components/
├── features/
│   ├── uploader/
│   ├── cropper/
│   ├── couple-avatar/
│   ├── couple-template/
│   ├── collage/
│   ├── export/
│   └── history/
├── utils/
├── workers/
└── styles/
```

## 图片处理说明

上传图片后会生成低分辨率预览用于界面显示；最终头像、模板和拼图导出会使用原始图片重新绘制到 Canvas。圆形头像 PNG 导出会保留透明区域，JPG / WebP 会使用配置背景色填充。

## 浏览器兼容

推荐使用新版 Chrome、Edge、Firefox 或 Safari。超大图片导出时如果超过浏览器 Canvas 限制，应用会提示降低输出尺寸。

## 后续开发计划

- 将耗时解码和导出迁移到更完整的 Web Worker。
- 为拼图自由画布接入更完整的 Fabric.js 图层编辑。
- 增加更多可配置情头模板和模板导入导出。
- 增加 EXIF 方向兼容性回归用例和浏览器端 E2E 验证。

