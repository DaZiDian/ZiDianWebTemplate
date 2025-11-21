# Z1D1anWeb - DaZiDian的个人网站

这是一个使用 Vue 3 + Vite 构建的现代化个人网站，部署在 Vercel 上。

## 🚀 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: Vue Router
- **部署**: Vercel

## 📦 安装依赖

```bash
npm install
```

## 🛠️ 本地开发

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动

## 🏗️ 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录

## 👀 预览生产构建

```bash
npm run preview
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式二：通过 Git 集成

1. 将代码推送到 GitHub
2. 在 Vercel 上导入项目
3. Vercel 会自动检测配置并部署

## 📁 项目结构

```
dazidian.github.io/
├── img/                    # 图片资源
├── src/
│   ├── components/        # Vue 组件
│   │   ├── NavBar.vue    # 导航栏
│   │   ├── Footer.vue    # 页脚
│   │   └── LoadingScreen.vue  # 加载动画
│   ├── views/            # 页面视图
│   │   ├── Home.vue      # 主页
│   │   ├── About.vue     # 关于我
│   │   ├── Blog.vue      # 文章
│   │   └── Guestbook.vue # 留言板
│   ├── router/           # 路由配置
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json           # Vercel 配置

```

## ✨ 功能特性

### 1. 主页
- 个人简介和签名
- 技能展示（操作系统、编程语言）
- GitHub 统计卡片
- 代表作品展示
- 开发工具展示
- 音乐播放器（待开发）

### 2. 关于我
- 国家/地区信息
- 个人基本信息
- 设备配置详情
- 诗歌展示
- 毛玻璃背景悬浮效果

### 3. 个人作品
- 自动跳转到 GitHub 主页

### 4. 文章
- Markdown 格式文章展示
- 发布时间和地点
- 分页功能
- 支持后台管理（待开发）

### 5. 留言板
- 用户可选填写头像、昵称、性别、生日、邮箱
- 必填留言内容
- Cookie 保存用户信息
- LocalStorage 保存留言记录
- 回到顶部按钮

## 🎨 设计特色

- **毛玻璃效果**: 现代化的毛玻璃背景（backdrop-filter）
- **流畅动画**: 页面加载、页面切换、悬浮交互等动画效果
- **响应式设计**: 完美适配桌面端、平板和移动端
- **渐变配色**: 紫色到粉色的渐变主题
- **交互反馈**: 丰富的鼠标悬浮和点击反馈

## ⚡ 性能优化

- Vite 快速构建和热更新
- 按需加载路由组件
- Tailwind CSS PurgeCSS 优化
- 图片懒加载
- 现代浏览器优化（backdrop-filter、transform）

## 🔗 社交链接

- QQ: [2489043224](http://wpa.qq.com/msgrd?v=3&uin=2489043224&site=qq&menu=yes)
- Bilibili: [@DaZiDian](https://space.bilibili.com/386254163)
- GitHub: [@DaZiDian](https://github.com/DaZiDian)
- YouTube: [@dazidian](https://www.youtube.com/@dazidian)
- Twitch: [@dazidian](https://www.twitch.tv/dazidian)
- X (Twitter): [@dazidian](https://x.com/dazidian)
- Steam: [DaZiDian](https://steamcommunity.com/id/DaZiDian)
- Email: [dz1d07@outlook.com](mailto:dz1d07@outlook.com)
- Discord: [daz1d1an](https://discordapp.com/users/daz1d1an)
- Telegram: [@daz1d1an](https://t.me/daz1d1an)

## 📝 License

Copyright © 2007-present DaZiDian & DSMCC. All Rights Reserved.

---

**春風若有憐花意，可否許我再少年？**

---

### 技术栈：

- 核心：Vue 3 + Vite + Tailwind CSS，构建现代响应式单页应用。（Core: Vue 3 + Vite + Tailwind CSS for building a modern responsive SPA.）
- 部署：使用 Vercel 部署，享受自动化构建与 CDN 加速。（Deployment: use Vercel for deployment, taking advantage of automated builds and CDN acceleration.）
- 其他：可选集成 TypeScript、Pinia/Vuex 管理状态，使用 Vue Router 实现路由。（Others: optionally integrate TypeScript, Pinia/Vuex for state management, and Vue Router for routing.）

### 安装与部署步骤：

1. 克隆仓库并进入项目目录。（Clone the repository and navigate to the project directory.）
2. 安装依赖：运行 `npm install`。（Install dependencies: run `npm install`.)
3. 本地开发：执行 `npm run dev` 启动开发服务器进行实时调试。（Local development: run `npm run dev` to start the development server for live debugging.）
4. 生产构建：执行 `npm run build` 生成生产环境静态文件。（Production build: run `npm run build` to generate production static files.）
5. 部署：使用 `vercel deploy` 或连接 GitHub 并在 Vercel 上自动部署。（Deploy: use `vercel deploy` or connect the repo to Vercel for automated deployment.）

