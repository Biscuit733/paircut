# Biscuit 情头工坊

Biscuit 情头工坊是一个浏览器本地运行的情侣头像裁剪、情头展示模板和智能拼图工具。图片只在当前浏览器内存里处理，不上传服务器，适合把一张 4:3 情侣插画快速拆成 A/B 头像，并继续生成情头展示海报、资料卡、聊天页或发布图。

## 功能

- 情头裁剪：一张原图独立裁剪头像 A / 头像 B，支持圆形、正方形、长方形、缩放、旋转、翻转、辅助线和键盘微调。
- 参数同步：从头像 A 切换到头像 B 时，会同步形状、比例、缩放和输出尺寸，保留各自位置，减少重复调参。
- 圆方双保留：无论当前选的是圆形还是正方形，模板和 ZIP 导出都会保留 A/B 的圆形与方形头像。
- 单图裁剪：复用裁剪组件，导出单张头像或封面。
- 情头模板：配置驱动的模板编辑器，内置夜色双圆、深色资料展示、浅色双格、Love / You 资料卡、聊天界面、极简双人卡片、发布分享图、可爱帖子、冬日甜甜展示和手绘头像组。
- 模板编辑：模板里的文字、头像、色块都可选中编辑；支持拖拽、位置尺寸调整、字体、描边、阴影、图片内部偏移缩放和水印显示/隐藏。
- 智能拼图：多图上传、排序、布局推荐、单格偏移缩放和拼图导出。
- 导出：支持 PNG / JPG / WebP。情头 ZIP 套装包含原图、模板图、A/B 圆形头像、A/B 方形头像、组合预览和 `export-info.json`。

## 技术栈

React、Vite、TypeScript、Tailwind CSS、react-easy-crop、JSZip、lucide-react、Zustand、Canvas API、Vitest、oxlint。

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

默认开发地址：

```text
http://localhost:5173
```

## 构建与检查

```bash
npm run build
npm run lint
npm run test
```

## 目录

```text
src/
├── app/                  # 应用入口和模式切换
├── components/ui/        # 通用 UI 组件
├── features/
│   ├── uploader/         # 图片上传与预览
│   ├── cropper/          # 通用裁剪组件和 Canvas 导出
│   ├── couple-avatar/    # A/B 情头裁剪流程
│   ├── couple-template/  # 情头模板编辑、预览和高清渲染
│   ├── collage/          # 智能拼图
│   └── export/           # 单图、模板和 ZIP 导出
├── utils/                # 文件名、图片、Canvas 校验工具
└── test/                 # 测试环境配置
```

## 导出套装结构

```text
biscuit-avatar-export/
├── original/
│   └── <作品名>-original-<原文件名>
├── avatars/
│   ├── <作品名>-avatar-a-circle.png
│   ├── <作品名>-avatar-a-square.png
│   ├── <作品名>-avatar-b-circle.png
│   └── <作品名>-avatar-b-square.png
├── templates/
│   └── <作品名>-selected-template.png
├── preview/
│   └── <作品名>-preview.png
└── export-info.json
```

## 图片处理说明

上传图片后会生成低分辨率预览用于界面显示；最终头像、模板和拼图导出会使用原始图片重新绘制到 Canvas。圆形头像 PNG 会保留透明区域，JPG / WebP 会使用配置的背景色填充。模板预览会同时生成圆形和方形头像缓存，确保编辑预览与最终导出一致。

## 浏览器兼容

推荐使用新版 Chrome、Edge、Firefox 或 Safari。超大图片导出时如果超过浏览器 Canvas 限制，应用会提示降低输出尺寸。

