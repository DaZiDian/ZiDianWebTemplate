# 开发者文档

## 项目架构

### 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **样式框架**: Tailwind CSS 3
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **部署平台**: Vercel

### 项目结构

```
dazidian.github.io/
├── img/                          # 静态图片资源
│   ├── cloud-server.png
│   ├── Devices.png
│   ├── info personal.png
│   ├── Qingdao.png
│   ├── wechat.png
│   └── 小红书.jpg
│
├── src/
│   ├── components/              # 可复用组件
│   │   ├── NavBar.vue          # 导航栏组件
│   │   ├── Footer.vue          # 页脚组件
│   │   └── LoadingScreen.vue   # 加载屏幕组件
│   │
│   ├── views/                  # 页面视图
│   │   ├── Home.vue           # 主页
│   │   ├── About.vue          # 关于我
│   │   ├── Blog.vue           # 文章列表
│   │   └── Guestbook.vue      # 留言板
│   │
│   ├── router/                # 路由配置
│   │   └── index.js          # 路由定义
│   │
│   ├── App.vue               # 根组件
│   ├── main.js              # 应用入口
│   └── style.css            # 全局样式
│
├── index.html               # HTML 模板
├── package.json            # 项目依赖
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
├── vercel.json            # Vercel 部署配置
└── .gitignore             # Git 忽略文件
```

## 核心功能实现

### 1. 路由系统

**文件**: `src/router/index.js`

- 使用 Vue Router 4 实现客户端路由
- 支持页面过渡动画
- 自动滚动到顶部
- 动态设置页面标题

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})
```

### 2. 加载动画

**文件**: `src/components/LoadingScreen.vue`

- 模拟进度条加载
- 随机增长算法
- 完成后触发展开动画

```javascript
const interval = setInterval(() => {
  progress.value += Math.random() * 15
  if (progress.value >= 100) {
    progress.value = 100
    clearInterval(interval)
    setTimeout(() => {
      emit('loaded')
    }, 300)
  }
}, 150)
```

### 3. 响应式导航栏

**文件**: `src/components/NavBar.vue`

- 滚动时背景变为毛玻璃效果
- 移动端折叠菜单
- 当前页面高亮
- 链接下划线动画

```javascript
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}
```

### 4. 留言板系统

**文件**: `src/views/Guestbook.vue`

- 使用 localStorage 存储留言
- 使用 Cookie 记住用户信息
- 表单验证
- 时间戳自动生成

**数据结构**:
```javascript
{
  avatar: String,      // 头像 URL
  nickname: String,    // 昵称
  gender: String,      // 性别
  birthday: String,    // 生日
  email: String,       // 邮箱
  content: String,     // 留言内容
  timestamp: String    // 时间戳
}
```

## 样式系统

### Tailwind CSS 配置

**文件**: `tailwind.config.js`

- 自定义动画关键帧
- 扩展默认主题
- PurgeCSS 优化

### 全局样式

**文件**: `src/style.css`

1. **毛玻璃效果**
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

2. **卡片悬浮效果**
```css
.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

3. **链接下划线动画**
```css
.link-underline::after {
  content: '';
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.link-underline:hover::after {
  transform: scaleX(1);
}
```

## 性能优化

### 1. 代码分割

**配置**: `vite.config.js`

```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'vue-vendor': ['vue', 'vue-router'],
    },
  },
}
```

### 2. 资源优化

- 移除生产环境的 console.log
- 启用 Terser 压缩
- CSS 代码分割
- 资源文件哈希命名

```javascript
terserOptions: {
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
}
```

### 3. 依赖预构建

```javascript
optimizeDeps: {
  include: ['vue', 'vue-router'],
}
```

### 4. 图片优化建议

- 使用 WebP 格式
- 实施懒加载
- 使用适当的尺寸
- CDN 加速

## API 集成

### GitHub Stats

使用 [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) API：

```html
<img 
  src="https://github-readme-stats.vercel.app/api?username=DaZiDian&count_private=true&locale=cn&theme=tokyonight" 
  alt="GitHub Stats" 
/>
```

### Shields.io Badges

使用 [shields.io](https://shields.io/) 生成技能徽章：

```html
<img src="https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white" />
```

## 浏览器兼容性

### 目标浏览器

```json
{
  "browserslist": [
    "defaults",
    "not IE 11",
    "maintained node versions"
  ]
}
```

### 关键特性

- **backdrop-filter**: 需要现代浏览器支持
- **CSS Grid**: 所有现代浏览器
- **Flexbox**: 所有现代浏览器
- **ES6+**: Vite 自动转译

## 开发工作流

### 1. 本地开发

```bash
# 启动开发服务器（支持热重载）
npm run dev

# 访问 http://localhost:3000
```

### 2. 代码规范

- 使用 Vue 3 Composition API
- 使用 `<script setup>` 语法
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase

### 3. 提交规范

```bash
# 功能开发
git commit -m "feat: 添加新功能"

# Bug 修复
git commit -m "fix: 修复某个问题"

# 文档更新
git commit -m "docs: 更新文档"

# 样式修改
git commit -m "style: 调整样式"

# 重构代码
git commit -m "refactor: 重构某部分代码"

# 性能优化
git commit -m "perf: 性能优化"
```

## 添加新功能

### 示例：添加新页面

1. **创建页面组件**

`src/views/NewPage.vue`:
```vue
<template>
  <div class="pt-20 pb-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">新页面</h1>
    </div>
  </div>
</template>

<script setup>
// 页面逻辑
</script>
```

2. **添加路由**

`src/router/index.js`:
```javascript
import NewPage from '../views/NewPage.vue'

const routes = [
  // ...
  {
    path: '/new-page',
    name: 'NewPage',
    component: NewPage,
    meta: { title: '新页面 - DaZiDian' }
  }
]
```

3. **添加导航链接**

`src/components/NavBar.vue`:
```javascript
const navLinks = [
  // ...
  { name: '新页面', path: '/new-page' },
]
```

## 调试技巧

### Vue DevTools

1. 安装 Vue DevTools 浏览器扩展
2. 打开开发者工具
3. 切换到 Vue 标签页

### 性能分析

```javascript
// 在组件中
import { onMounted } from 'vue'

onMounted(() => {
  console.time('组件挂载时间')
  // ... 代码
  console.timeEnd('组件挂载时间')
})
```

### Vite 开发工具

```bash
# 查看依赖预构建
vite optimize

# 分析构建产物
vite build --mode analyze
```

## 测试

### 手动测试清单

- [ ] 所有页面正常加载
- [ ] 导航链接正常工作
- [ ] 响应式设计在不同设备上正常
- [ ] 表单提交功能正常
- [ ] 动画效果流畅
- [ ] 图片正常加载
- [ ] 外部链接可以打开
- [ ] 留言板可以保存和显示留言

### 浏览器测试

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动浏览器（iOS Safari, Chrome Mobile）

## 故障排查

### 常见问题

1. **端口被占用**
```bash
# 修改端口
# vite.config.js
server: {
  port: 3001,
}
```

2. **依赖安装失败**
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

3. **构建失败**
```bash
# 查看详细错误
npm run build -- --debug
```

4. **热更新不工作**
```bash
# 重启开发服务器
# Ctrl+C 停止
npm run dev
```

## 部署检查清单

部署前确认：

- [ ] 代码已提交到 Git
- [ ] 本地构建成功 (`npm run build`)
- [ ] 预览构建正常 (`npm run preview`)
- [ ] 所有图片资源已上传
- [ ] 环境变量已配置（如有）
- [ ] README 已更新
- [ ] 版本号已更新

## 扩展建议

### 未来功能

1. **后台管理系统**
   - 文章管理（CRUD）
   - 留言管理
   - 访问统计

2. **文章系统增强**
   - Markdown 编辑器
   - 代码高亮
   - 图片上传
   - 文章分类和标签

3. **音乐播放器**
   - 集成 Spotify API
   - 播放列表管理
   - 歌词显示

4. **评论系统**
   - 集成第三方评论（如 Disqus）
   - 或自建评论系统

5. **搜索功能**
   - 全站搜索
   - 文章搜索
   - 标签搜索

6. **深色模式**
   - 主题切换
   - 保存用户偏好

7. **多语言支持**
   - 中英文切换
   - i18n 国际化

8. **更多动画**
   - 页面滚动动画
   - 粒子效果
   - 背景动画

## 资源链接

### 官方文档

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Vue Router 文档](https://router.vuejs.org/zh/)

### 工具和库

- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)
- [Shields.io](https://shields.io/)
- [Simple Icons](https://simpleicons.org/)

### 学习资源

- [Vue Mastery](https://www.vuemastery.com/)
- [Vue School](https://vueschool.io/)
- [Tailwind UI](https://tailwindui.com/)

---

**开发愉快！** 🚀

如有问题，请查阅文档或提交 Issue。

