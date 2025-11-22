# 网站模板自定义指南

本文档说明如何自定义这个网站模板，包括可修改和严禁修改的部分。

## 📋 目录

- [可修改部分](#可修改部分)
- [严禁修改部分](#严禁修改部分)
- [修改步骤](#修改步骤)
- [文件路径索引](#文件路径索引)

---

## ✅ 可修改部分

### 1. 网站图标和标题

#### 网站图标 (Favicon)
- **文件路径**: `index.html` (第5行)
- **当前值**: `/img/LOGO.jpg`
- **修改方法**: 替换 `public/img/LOGO.jpg` 文件，或修改 `index.html` 中的路径

```html
<!-- 可修改: 网站图标 -->
<link rel="icon" type="image/jpeg" href="/img/LOGO.jpg" />
```

#### 页面标题
- **文件路径**: `index.html` (第38行)
- **当前值**: `DaZiDian - 春風若有憐花意，可否許我再少年？`
- **修改方法**: 直接修改 `<title>` 标签内容

```html
<!-- 可修改: 页面标题 -->
<title>你的网站标题</title>
```

#### 动态页面标题
- **文件路径**: `src/router/index.js`
- **修改方法**: 修改路由配置中的 `meta.title` 字段

```javascript
// 可修改: 各页面的标题
{
  path: '/',
  name: 'Home',
  component: Home,
  meta: { title: '你的主页标题' }  // 修改这里
}
```

---

### 2. 顶部导航栏

#### Logo 和标题
- **文件路径**: `src/components/NavBar.vue` (第9-16行)
- **修改方法**: 
  - Logo图片: 替换 `/img/LOGO.jpg` 或修改路径
  - 标题文字: 修改 `DaZiDian` 文本

```vue
<!-- 可修改: Logo和标题 -->
<router-link to="/" class="flex items-center gap-3">
  <img src="/img/LOGO.jpg" alt="Logo" class="w-10 h-10 rounded-full" />
  <span class="text-2xl font-bold logo-text">
    你的网站名称  <!-- 修改这里 -->
  </span>
</router-link>
```

#### 导航链接
- **文件路径**: `src/components/NavBar.vue` (第141-148行)
- **修改方法**: 修改 `navLinks` 数组

```javascript
// 可修改: 导航链接
const navLinks = [
  { name: '主页', path: '/' },
  { name: '关于我', path: '/about' },
  { name: '个人作品', path: '/works' },
  { name: '文章', path: '/blog' },
  { name: '留言板', path: '/guestbook' },
  { name: '商铺', path: '/shop' },
]
```

#### 链接样式（底部横线）
- **文件路径**: `src/components/NavBar.vue` (第208-232行)
- **修改方法**: 修改 `.link-underline::after` 样式

```css
/* 可修改: 链接下划线样式 */
.link-underline::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;  /* 修改高度 */
  bottom: -4px;  /* 修改位置 */
  left: 0;
  background: linear-gradient(90deg, #7aa2f7, #7dcfff);  /* 修改颜色 */
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;  /* 修改动画速度 */
}
```

---

### 3. 页面正文内容

#### 主页内容
- **文件路径**: `src/views/Home.vue`
- **修改方法**: 直接修改模板中的文本、图片、链接等内容

#### 关于我页面
- **文件路径**: `src/views/About.vue`
- **修改方法**: 修改个人信息、技能、经历等内容

#### 文章页面
- **文件路径**: `src/views/Blog.vue`
- **修改方法**: 修改页面标题、描述等（文章内容通过管理后台添加）

#### 留言板页面
- **文件路径**: `src/views/Guestbook.vue`
- **修改方法**: 修改页面标题、描述等（留言内容由用户提交）

#### 商铺页面
- **文件路径**: `src/views/Shop.vue`
- **修改方法**: 修改商品/服务列表、价格、描述等

---

### 4. 底部信息栏

#### Logo 和名称
- **文件路径**: `src/components/Footer.vue` (第6-12行)
- **修改方法**: 
  - Logo图片: 替换 `/img/LOGO.jpg` 或修改路径
  - 名称和职位: 修改文本内容

```vue
<!-- 可修改: 底部Logo和名称 -->
<div class="flex items-center space-x-4 mb-4">
  <img src="/img/LOGO.jpg" alt="Logo" class="w-16 h-16 rounded-full" />
  <div>
    <h3 class="text-2xl font-bold text-tokyo-night-cyan">你的名称</h3>
    <p class="text-sm text-tokyo-night-fg-dark">你的职位</p>
  </div>
</div>
```

#### 联系方式和社交链接
- **文件路径**: `src/components/Footer.vue` (第24-150行)
- **修改方法**: 修改 `socialLinks` 对象中的链接地址和图标

```javascript
// 可修改: 社交链接
const socialLinks = {
  qq: 'tencent://message/?uin=你的QQ号',
  wechat: '你的微信号',
  github: 'https://github.com/你的用户名',
  email: 'mailto:你的邮箱',
  // ... 更多链接
}
```

#### 社交图标
- **文件路径**: `src/components/Footer.vue` (第27-150行)
- **修改方法**: 修改 SVG 图标或替换为其他图标组件

---

## 🚫 严禁修改部分

### 1. 推广信息和版权信息

以下内容**严禁修改或删除**：

#### 底部版权信息
- **文件路径**: `src/components/Footer.vue` (第18行)
- **严禁修改**: 必须保留完整的版权声明

```vue
<!-- 严禁修改: 版权信息 -->
<p class="text-sm text-tokyo-night-dark5">
  DaZiDian & DSMCC ©2007-present All Copyrights Reserved.
</p>
```

#### 网站描述中的推广信息
- **文件路径**: `index.html` (第9行)
- **严禁修改**: SEO描述中的品牌信息

```html
<!-- 严禁修改: 推广信息 -->
<meta name="description" content="DaZiDian的个人网站 - 专业信息安全，主攻渗透测试、数据恢复、服务器运维、大数据、人工智能方向。来自中国山东青岛的技术爱好者。" />
```

---

### 2. 隐私政策和用户协议

如果网站包含隐私政策和用户协议页面，这些内容**严禁修改**。

#### 隐私政策
- **文件路径**: 如果存在 `src/views/Privacy.vue` 或类似文件
- **严禁修改**: 完整的隐私政策内容

#### 用户协议
- **文件路径**: 如果存在 `src/views/Terms.vue` 或类似文件
- **严禁修改**: 完整的用户协议内容

---

## 📝 修改步骤

### 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/你的用户名/ZiDianWebTemplate.git
   cd ZiDianWebTemplate
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **修改可修改部分**
   - 按照上面的文件路径索引，找到需要修改的文件
   - 根据注释标记 `<!-- 可修改: ... -->` 或 `// 可修改: ...` 进行修改

4. **替换资源文件**
   - 将你的 Logo 图片放到 `public/img/` 目录
   - 替换其他图片资源

5. **测试修改**
   ```bash
   npm run dev
   ```

6. **构建和部署**
   ```bash
   npm run build
   ```

---

## 📂 文件路径索引

### 核心配置文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 网站图标 | `index.html` | 第5行，favicon链接 |
| 页面标题 | `index.html` | 第38行，`<title>`标签 |
| 路由配置 | `src/router/index.js` | 各页面的路由和标题 |

### 组件文件

| 组件 | 路径 | 主要可修改内容 |
|------|------|----------------|
| 导航栏 | `src/components/NavBar.vue` | Logo、标题、导航链接、链接样式 |
| 底部栏 | `src/components/Footer.vue` | Logo、名称、职位、社交链接、图标 |
| 个性化设置 | `src/components/ThemeCustomizer.vue` | 用户可通过界面自定义，无需修改代码 |

### 页面文件

| 页面 | 路径 | 主要可修改内容 |
|------|------|----------------|
| 主页 | `src/views/Home.vue` | 所有页面内容 |
| 关于我 | `src/views/About.vue` | 个人信息、技能、经历 |
| 文章 | `src/views/Blog.vue` | 页面标题、描述 |
| 留言板 | `src/views/Guestbook.vue` | 页面标题、描述 |
| 商铺 | `src/views/Shop.vue` | 商品/服务列表 |

### 样式文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 全局样式 | `src/style.css` | 主题颜色、字体、通用样式 |
| 导航栏样式 | `src/components/NavBar.vue` | 链接下划线样式（第208-232行） |

### 资源文件

| 资源 | 路径 | 说明 |
|------|------|------|
| Logo | `public/img/LOGO.jpg` | 网站Logo图片 |
| 其他图片 | `public/img/` | 其他图片资源 |

---

## 💡 提示

1. **备份原文件**: 修改前建议先备份原文件
2. **查看注释**: 代码中已添加 `<!-- 可修改: ... -->` 或 `// 可修改: ...` 注释，方便定位
3. **测试修改**: 每次修改后都要测试，确保功能正常
4. **保持格式**: 修改时注意保持代码格式和缩进
5. **遵守协议**: 严禁修改版权信息和推广信息

---

## ❓ 常见问题

### Q: 如何修改网站名称？
A: 修改以下位置：
- `src/components/NavBar.vue` 第15行（导航栏）
- `src/components/Footer.vue` 第10行（底部栏）
- `index.html` 第38行（页面标题）

### Q: 如何添加新的导航链接？
A: 在 `src/components/NavBar.vue` 的 `navLinks` 数组中添加新项，然后在 `src/router/index.js` 中添加对应的路由。

### Q: 如何修改链接下划线的颜色？
A: 修改 `src/components/NavBar.vue` 第221行的 `background` 属性。

### Q: 如何添加新的社交链接？
A: 在 `src/components/Footer.vue` 的 `socialLinks` 对象中添加新项，然后在模板中添加对应的图标和链接。

---

## 📞 支持

如有问题，请查看代码中的注释或提交 Issue。

---

**最后更新**: 2024年11月

