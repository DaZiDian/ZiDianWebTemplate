# 网站使用指南

## 📖 功能说明

### 1. 主页（Home）

主页展示个人简介和主要信息。

#### 功能模块：

- **个人签名区域**
  - 圆形Logo（显示 "DZ"）
  - 艺术签名文字
  - 个人座右铭

- **关于我卡片**
  - 专业方向介绍
  - 地理位置信息
  - 生日信息
  - 学校信息

- **技能展示卡片**
  - 操作系统技能（Windows、Linux）
  - 编程语言（Java、JavaScript、C#、C++、Vue.js、Python、TypeScript、ArkTS）
  - GitHub 统计卡片（实时显示）

- **代表作品卡片**
  - 展示 6 个主要项目
  - 点击可跳转到 GitHub 项目页面
  - 项目简介

- **开发工具展示台**
  - VS Code
  - Cursor
  - IntelliJ IDEA
  - Jupyter
  - PyCharm

- **音乐盒**
  - 占位区域（Coming Soon）
  - 未来可集成音乐播放功能

### 2. 关于我（About）

采用毛玻璃卡片网格布局，展示个人详细信息。

#### 功能特性：

- **国家/地区卡片**
  - 背景图：Qingdao.png
  - 悬浮时背景图淡入显示

- **个人信息卡片**
  - 生日：2007.3.26
  - 血型：O型
  - 性格：INTJ
  - 视力：5.2 / 5.3

- **设备信息卡片**
  - 笔记本配置
  - 手机配置
  - 家庭服务器配置
  - 外设设备

- **诗歌展示卡片**
  - 席慕蓉《青春》全文

### 3. 个人作品（Works）

点击后自动跳转到 GitHub 主页：https://github.com/DaZiDian

### 4. 文章（Blog）

展示文章列表，支持 Markdown 格式。

#### 当前功能：

- **文章展示**
  - 标题
  - 发布时间
  - 发布地点
  - 文章预览
  - "阅读更多"按钮

- **示例文章**
  - 提供了两篇示例文章
  - 可在 `src/views/Blog.vue` 中修改

#### 如何添加文章：

编辑 `src/views/Blog.vue` 文件，在 `articles` 数组中添加新文章：

```javascript
const articles = ref([
  {
    title: '你的文章标题',
    date: '2024-11-20',
    location: '中国 山东 青岛',
    content: '你的文章内容...'
  },
  // ... 更多文章
])
```

#### 未来扩展：

- 后台管理系统
- 文章详情页
- Markdown 渲染
- 评论功能
- 分类和标签

### 5. 留言板（Guestbook）

允许访客留下留言和联系方式。

#### 功能特性：

- **留言表单**
  - 头像（可选，支持图片 URL）
  - 昵称（可选，默认"游客"）
  - 性别（可选，男/女/其他）
  - 生日（可选）
  - 邮箱（可选）
  - 留言内容（必填）
  - "记住我的信息" 选项

- **数据存储**
  - 用户信息保存在 Cookie（如果勾选"记住我"）
  - 留言保存在 localStorage
  - 刷新页面不会丢失数据

- **留言显示**
  - 按时间倒序显示
  - 显示留言者头像和信息
  - 显示留言内容和时间戳

- **交互功能**
  - 回到顶部按钮（滚动超过 300px 时显示）
  - 平滑滚动动画

#### 如何清除留言：

在浏览器控制台执行：
```javascript
localStorage.removeItem('guestbook_messages')
```

## 🎨 设计特性

### 毛玻璃效果

网站大量使用毛玻璃效果（backdrop-filter）：
- `.glass-effect`: 亮色毛玻璃
- `.glass-effect-dark`: 暗色毛玻璃

### 动画效果

1. **页面加载动画**
   - 进度条加载
   - 向外展开动画

2. **导航栏动画**
   - 滚动时背景变为毛玻璃
   - 链接下划线从中间向两侧展开
   - 当前页面链接持续脉动动画

3. **卡片悬浮效果**
   - 鼠标悬浮时卡片上浮并放大
   - 阴影加深
   - 平滑过渡

4. **背景悬浮效果**
   - 关于我页面的卡片背景
   - 悬浮时背景图淡入显示

### 响应式设计

- **桌面端**: 多列网格布局
- **平板端**: 双列布局
- **移动端**: 单列布局 + 折叠菜单

### 配色方案

- 主色调：紫色到粉色渐变
  - `from-purple-600 to-pink-600`
- 背景：柔和渐变
  - `from-purple-50 via-blue-50 to-pink-50`
- 文字：灰色系统

## ⚙️ 自定义配置

### 修改个人信息

1. **主页信息**
   - 编辑 `src/views/Home.vue`
   - 修改项目数组、技能列表等

2. **关于我信息**
   - 编辑 `src/views/About.vue`
   - 更新个人信息、设备配置等

3. **社交链接**
   - 编辑 `src/components/Footer.vue`
   - 修改 `socialLinks` 对象

4. **网站标题和描述**
   - 编辑 `index.html`
   - 修改 `<title>` 和 meta 标签

### 更换背景图片

将图片放在 `img/` 目录下，然后在对应组件中引用：

```vue
:style="{ backgroundImage: `url(/img/your-image.png)` }"
```

### 修改主题色

编辑 `tailwind.config.js` 或直接修改 Vue 组件中的类名：
- `from-purple-600` → 改为其他颜色
- `to-pink-600` → 改为其他颜色

### 添加新页面

1. 在 `src/views/` 创建新的 Vue 组件
2. 在 `src/router/index.js` 添加路由
3. 在 `src/components/NavBar.vue` 添加导航链接

## 🔧 维护和更新

### 定期更新

```bash
# 更新依赖
npm update

# 检查过期的包
npm outdated

# 更新到最新版本
npm install vue@latest vue-router@latest vite@latest
```

### 性能监控

- 使用 Vercel Analytics 监控访问数据
- 使用浏览器开发者工具检查性能
- 使用 Lighthouse 进行性能审计

### 备份

定期备份以下内容：
- 源代码（推送到 Git）
- 图片资源
- 留言数据（如有需要）

## 📱 浏览器兼容性

支持的浏览器：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

不支持：
- IE 11 及更早版本

## 🐛 常见问题

### 问题：样式不显示

**解决方案**：
1. 确保 Tailwind CSS 正确安装
2. 检查 `tailwind.config.js` 配置
3. 运行 `npm run dev` 重新启动

### 问题：图片不显示

**解决方案**：
1. 确保图片路径正确（从 `public` 目录或 `img` 目录）
2. 使用 `/img/xxx.png` 而不是 `./img/xxx.png`
3. 检查图片文件是否存在

### 问题：留言不保存

**解决方案**：
1. 检查浏览器是否启用 Cookie 和 localStorage
2. 清除浏览器缓存后重试
3. 检查浏览器控制台是否有错误

### 问题：GitHub Stats 卡片不显示

**解决方案**：
1. 检查网络连接
2. 验证 GitHub 用户名是否正确
3. GitHub API 可能有访问限制，稍后再试

## 💡 提示和技巧

1. **快速开发**
   - 使用 `npm run dev` 启动热重载
   - 修改代码后自动刷新

2. **调试**
   - 使用 Vue DevTools 浏览器扩展
   - 在组件中使用 `console.log()` 调试

3. **SEO 优化**
   - 定期更新文章内容
   - 使用有意义的页面标题和描述
   - 添加 sitemap.xml

4. **性能优化**
   - 压缩图片
   - 使用 WebP 格式
   - 启用 CDN

---

**需要帮助？**

如有问题或建议，请：
- 提交 GitHub Issue
- 发送邮件至 dz1d07@outlook.com
- 在留言板留言

