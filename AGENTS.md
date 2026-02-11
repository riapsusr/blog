# Syu's Blog - AI 助手配置

## 🌟 项目概览
- 项目名称：Syu's Blog
- 网址：https://199623.xyz
- 作者：SyuEishin
- 联系邮箱：riapsusr@gmail.com

### 技术栈
- **框架**：Astro 5.0.5
- **语言**：TypeScript 5.4
- **样式**：Tailwind CSS 3.4
- **包管理器**：pnpm 10.27.0

### 功能模块
- MDX 支持（@astrojs/mdx）
- 站点地图（@astrojs/sitemap）
- RSS 订阅（@astrojs/rss）
- 客户端全文搜索（Pagefind）
- Vercel 网站分析

---

## 📂 项目结构

```
blog/
├── src/
│   ├── components/       # Astro 组件（Header, Footer, 卡片等）
│   ├── content/         # 内容文件
│   │   ├── posts/       # 文章（markdown + frontmatter）
│   │   │   └── *.md     # title, description, date, category, draft
│   │   └── instants/    # 刹那（图片 + 地点）
│   ├── layouts/         # 页面布局模板
│   │   └── PageLayout.astro
│   ├── pages/           # 路由页面
│   │   ├── index.astro              # 首页
│   │   ├── posts/          # 文章列表和详情
│   │   ├── instants.astro            # 刹那列表
│   │   ├── about.astro               # 关于页面
│   │   ├── search.astro              # 搜索页面
│   │   └── rss.xml.ts                # RSS 订阅
│   ├── styles/          # 全局样式
│   │   └── global.css   # 通用样式（文楷字体等）
│   ├── lib/             # 工具函数
│   ├── consts.ts        # 站点常量（名称、邮件、社交链接）
│   └── types.ts         # TypeScript 类型定义
├── .astro/              # Astro 缓存（忽略）
├── dist/                # 构建输出（忽略）
├── public/              # 静态资源
├── astro.config.mjs     # Astro 配置
├── tailwind.config.mjs  # Tailwind 配置
└── package.json         # 依赖和脚本命令
```

---

## 🛠️ 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（热更新）
pnpm dev:network      # 启动开发服务器（局域网可访问）

# 构建
pnpm build            # 构建生产版本（包含搜索索引）
pnpm preview          # 本地预览构建结果
pnpm preview:network  # 预览（局域网可访问）

# 代码质量
pnpm lint             # ESLint 代码检查
pnpm lint:fix         # 自动修复可修复的问题

# 包管理
pnpm install          # 安装依赖
pnpm add <pkg>        # 添加新依赖
pnpm update           # 更新依赖
```

---

## 🔧 重要配置文件

### astro.config.mjs
- 站点域名：`https://199623.xyz`
- 已集成：MDX, Sitemap, Tailwind

### tailwind.config.mjs
- 深色模式：启用（class 模式）
- 字体：霞鹜文楷（LXGW WenKai Screen）
- 插件：@tailwindcss/typography

### src/content/config.ts
- posts 集合：`title`, `description`, `date`, `category`, `draft`
- instants 集合：`date`, `location`, `images[]`

### src/consts.ts
- 站点常量配置
- 首页文章和刹那显示数量
- 社交链接（Twitter, Telegram, Email, RSS）

### package.json
- 查看可用命令的脚本部分
- 依赖版本管理

---

## 📝 常见任务指南

### 添加新文章
1. 在 `src/content/posts/` 创建新的 `.md` 文件
2. frontmatter 格式：
   ```yaml
   ---
   title: 文章标题
   description: 文章描述
   date: YYYY-MM-DD
   category: 分类名称
   draft: false  # 可选，默认 false
   ---
   ```
3. 文章内容使用 Markdown

### 添加新刹那
1. 在 `src/content/instants/` 创建新的 `.md` 文件
2. 图片放入同目录
3. frontmatter 格式：
   ```yaml
   ---
   date: YYYY-MM-DD
   location: 地点名称
   images: [image.jpg]
   ---
   ```

### 添加新页面
1. 在 `src/pages/` 创建新文件（如 `new-page.astro`）
2. 使用 PageLayout 布局组件
3. 通过路由自动访问（如 `/new-page`）

### 修改样式
- 全局样式：`src/styles/global.css`
- Tailwind 类：直接在组件中使用
- 组件样式：使用 `<style>` 标签（Astro supports scoped styles）

### 修改配置
- 修改首页文章数量：编辑 `src/consts.ts`
- 修改内容集合：编辑 `src/content/config.ts`
- 修改主题颜色：编辑 `tailwind.config.mjs`

---

## ⚠️ 注意事项

### 代码规范
- 使用 TypeScript，保持类型安全
- 所有代码在提交前必须通过 `pnpm lint`
- 修复格式问题使用 `pnpm lint:fix`

### Git 工作流
```bash
# 开始新功能
git checkout -b feature/xxx

# 查看变更
git status
git diff

# 提交代码
git add .
git commit -m "feat: 添加某功能"
```

### 构建要求
- 所有修改确保通过 `pnpm build` 无错误
- 搜索功能仅在生产构建后可用
- 部署前预览：`pnpm preview`

### 内容规范
- 文章使用中文撰写
- Markdown 格式规范
- 图片放在 `src/content/instants/` 或 `public/` 目录

---

## 🚀 推荐工作流

### 新功能开发
1. 创建 Git 分支
2. 使用 AI 助手规划实现方案
3. 定期提交代码（小步迭代）
4. 本地测试（`pnpm dev`）
5. 构建验证（`pnpm build`）
6. 代码审查（`pnpm lint`）
7. 合并到主分支

### Bug 修复
1. 描述问题现象
2. 让 AI 助手定位问题
3. 查看修改（`git diff`）
4. 验证修复效果
5. 提交代码

### 内容更新
1. 直接在 `src/content/posts/` 编辑 markdown 文件
2. frontmatter 信息完整
3. 本地预览效果
4. 提交更新

---

## 📚 参考资源

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [TypeScript 文档](https://www.typescriptlang.org)
