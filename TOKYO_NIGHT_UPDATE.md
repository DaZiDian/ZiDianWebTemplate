# Tokyo Night 主题更新说明

## 更新内容总结

### ✅ 已完成的优化

#### 1. **Tokyo Night 配色主题**
- 将全站配色从紫粉渐变主题改为 Tokyo Night 暗色主题
- 主要颜色：
  - 蓝色 (`#7aa2f7`) - 主色调
  - 青色 (`#7dcfff`) - 强调色
  - 紫色 (`#bb9af7`) - 装饰色
  - 洋红 (`#9d7cd8`) - 辅助色
  - 橙色 (`#ff9e64`) - 警告色
  - 黄色 (`#e0af68`) - 提示色
  - 绿色 (`#9ece6a`) - 成功色
  - 红色 (`#f7768e`) - 错误色

#### 2. **字体优化**
- 英文：JetBrains Mono
- 中文：华文中宋 (STZhongsong)
- 通过 Google Fonts CDN 引入 JetBrains Mono
- 在 Tailwind Config 中配置字体系列

#### 3. **Logo 和 Favicon**
- 替换网站 favicon 为 `/img/LOGO.jpg`
- 在导航栏和页脚使用 Logo 图片
- Logo 添加圆形边框和 Tokyo Night 蓝色边框

#### 4. **毛玻璃效果优化**
- 更新为 Tokyo Night 风格的毛玻璃效果
- 背景色：`rgba(41, 46, 66, 0.6)`
- 边框：Tokyo Night 蓝色半透明
- 增强阴影效果

#### 5. **导航栏优化**
- Logo 显示图片 + 文字
- 链接悬浮下划线改为蓝色到青色渐变
- 移动端折叠菜单使用毛玻璃背景
- **实现收回动画**：使用 `slideDownOut` 关键帧动画
- 菜单项带圆角和悬浮效果

#### 6. **底部栏优化**
- Logo 使用图片替代文字
- 文字颜色改为 Tokyo Night 前景色
- 社交图标优化：
  - **图标向上浮动** (translateY(-6px))
  - **缩小间距** (gap-3)
  - **优化二维码显示**：
    - 使用 `object-contain` 保持原图比例
    - 二维码弹出框使用毛玻璃背景
    - 添加平滑的弹出/收回动画
  - Tokyo Night 蓝色边框和背景
  - 悬浮时颜色渐变为青色

#### 7. **My Devices 背景优化**
- 背景图片大小：80%
- 背景位置：center 60%
- 不重复平铺
- 悬浮透明度：15%
- 更好地适配卡片内容

#### 8. **各页面配色更新**

**主页 (Home.vue)**
- Hero 区域使用 Logo 图片
- 标题使用蓝色到青色渐变
- 所有卡片文字改为 Tokyo Night 配色
- 项目卡片添加边框和悬浮效果

**关于我 (About.vue)**
- 所有标题使用青色
- 正文使用前景色
- 诗歌强调文字使用渐变
- 保持背景悬浮效果

**文章 (Blog.vue)**
- 标题使用紫色到紫罗兰渐变
- 文章标题青色
- 按钮使用蓝色到青色渐变
- 分页按钮带边框

**留言板 (Guestbook.vue)**
- 表单输入框使用深色背景
- 边框 Tokyo Night 蓝色半透明
- 按钮使用蓝色到青色渐变
- 头像圆圈使用渐变色

#### 9. **折叠菜单动画**
- **展开动画** (`slideDownIn`)：
  - 从上方滑入
  - 带缩放效果 (scaleY)
  - 使用弹性缓动曲线
- **收回动画** (`slideDownOut`)：
  - 向上滑出
  - 带缩放效果
  - 平滑缓动

#### 10. **二维码弹出优化**
- 弹出框使用毛玻璃背景
- 图片使用 `object-contain` 保持比例
- 添加平滑的进入/退出动画
- 向上弹出而不是横向展开

---

## 配色对比

### 原配色
- 主色：紫色 (#9333ea) 到粉色 (#ec4899)
- 背景：浅色渐变 (purple-50, blue-50, pink-50)
- 文字：灰色系统

### Tokyo Night 配色
- 主色：蓝色 (#7aa2f7) 到青色 (#7dcfff)
- 背景：深色 (#1a1b26)
- 文字：亮灰色 (#c0caf5)
- 强调：紫色、洋红、橙色、黄色

---

## 技术实现

### CSS 变量
```css
:root {
  --tokyo-night-bg: #1a1b26;
  --tokyo-night-fg: #c0caf5;
  --tokyo-night-blue: #7aa2f7;
  --tokyo-night-cyan: #7dcfff;
  --tokyo-night-magenta: #bb9af7;
  --tokyo-night-purple: #9d7cd8;
  --tokyo-night-orange: #ff9e64;
  --tokyo-night-yellow: #e0af68;
  --tokyo-night-green: #9ece6a;
  --tokyo-night-red: #f7768e;
}
```

### Tailwind 配置
```javascript
colors: {
  'tokyo-night': {
    'bg': '#1a1b26',
    'fg': '#c0caf5',
    'blue': '#7aa2f7',
    'cyan': '#7dcfff',
    // ... 更多颜色
  },
}
```

### 字体配置
```javascript
fontFamily: {
  'mono': ['JetBrains Mono', 'monospace'],
  'sans': ['JetBrains Mono', 'STZhongsong', '华文中宋', 'sans-serif'],
}
```

---

## 文件修改清单

### 配置文件
- ✅ `src/style.css` - 全局样式和 Tokyo Night 变量
- ✅ `tailwind.config.js` - Tailwind 配色和字体
- ✅ `src/App.vue` - 根组件背景
- ✅ `index.html` - Favicon 和字体引入

### 组件
- ✅ `src/components/NavBar.vue` - 导航栏配色和动画
- ✅ `src/components/Footer.vue` - 底部栏配色和图标优化
- ✅ `src/components/LoadingScreen.vue` - (无需修改)

### 页面
- ✅ `src/views/Home.vue` - 主页配色
- ✅ `src/views/About.vue` - 关于我配色和背景
- ✅ `src/views/Blog.vue` - 文章页配色
- ✅ `src/views/Guestbook.vue` - 留言板配色

---

## 使用说明

### 本地开发
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 部署
```bash
vercel --prod
```

---

## 参考资源

- [Tokyo Night 主题](https://github.com/enkia/tokyo-night-vscode-theme)
- [ZYYO 主题](https://github.com/ZYYO666/ZYYO)
- [JetBrains Mono 字体](https://www.jetbrains.com/lp/mono/)

---

## 注意事项

1. **Logo 和 Favicon**
   - 确保 `/img/LOGO.jpg` 文件存在
   - 建议尺寸：至少 512x512 像素
   - 格式：JPG 或 PNG

2. **二维码图片**
   - `/img/wechat.png` - 微信二维码
   - `/img/小红书.jpg` - 小红书二维码
   - 使用 `object-contain` 保持原比例

3. **字体加载**
   - JetBrains Mono 通过 Google Fonts CDN 加载
   - 华文中宋需要用户系统安装
   - 有降级字体方案

4. **浏览器兼容性**
   - 毛玻璃效果需要现代浏览器
   - backdrop-filter 支持 Chrome 76+, Firefox 103+
   - 建议测试 Safari 和移动浏览器

---

## 更新时间

2024年11月20日

---

**春風若有憐花意，可否許我再少年？**

