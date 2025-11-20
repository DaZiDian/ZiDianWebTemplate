# 快速启动指南 🚀

## 5分钟快速上手

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

检查版本：
```bash
node --version
npm --version
```

如果没有安装，请访问 [nodejs.org](https://nodejs.org/) 下载安装。

---

## 步骤 1: 克隆项目

```bash
git clone https://github.com/DaZiDian/dazidian.github.io.git
cd dazidian.github.io
```

或者直接下载 ZIP 文件并解压。

---

## 步骤 2: 安装依赖

```bash
npm install
```

等待几分钟，依赖安装完成。

---

## 步骤 3: 启动开发服务器

```bash
npm run dev
```

看到类似输出：
```
  VITE v5.4.21  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 步骤 4: 访问网站

在浏览器中打开：http://localhost:3000

🎉 恭喜！网站已经在本地运行了。

---

## 个性化配置

### 修改个人信息

编辑以下文件：

1. **主页信息** - `src/views/Home.vue`
   - 修改个人简介
   - 更新项目列表
   - 修改技能展示

2. **关于我** - `src/views/About.vue`
   - 更新个人信息
   - 修改设备配置
   - 更换背景图片

3. **社交链接** - `src/components/Footer.vue`
   - 修改 `socialLinks` 对象中的链接

4. **网站标题** - `index.html`
   - 修改 `<title>` 标签
   - 更新 meta 描述

### 更换图片

将你的图片放在 `img/` 目录下，然后在组件中引用：

```html
<img src="/img/your-image.png" alt="描述" />
```

---

## 生产构建

构建用于部署的生产版本：

```bash
npm run build
```

构建产物在 `dist/` 目录中。

---

## 预览构建

在本地预览生产构建：

```bash
npm run preview
```

访问提示的地址（通常是 http://localhost:4173）

---

## 部署到 Vercel

### 方法 1: CLI 部署（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 方法 2: GitHub 集成

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 点击 "Deploy"

---

## 常见问题

### 端口被占用

修改 `vite.config.js`：
```javascript
server: {
  port: 3001,  // 改为其他端口
}
```

### 依赖安装失败

```bash
# 清除缓存
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 图片不显示

确保图片路径正确：
- ✅ `/img/photo.png`
- ❌ `./img/photo.png`
- ❌ `img/photo.png`

---

## 目录结构

```
dazidian.github.io/
├── img/              # 图片资源
├── src/
│   ├── components/   # 组件
│   ├── views/        # 页面
│   ├── router/       # 路由
│   └── style.css     # 样式
├── index.html        # HTML 模板
└── package.json      # 项目配置
```

---

## 开发技巧

### 热重载

修改代码后自动刷新浏览器，无需手动刷新。

### Vue DevTools

安装 Vue DevTools 浏览器扩展，可以查看组件结构和状态。

### 样式调试

使用 Tailwind CSS 类名快速调整样式：
```html
<div class="text-center text-blue-600 font-bold">
  Hello World
</div>
```

---

## 下一步

- 📖 阅读 [USAGE.md](./USAGE.md) 了解详细功能
- 🛠️ 阅读 [DEVELOPER.md](./DEVELOPER.md) 了解开发细节
- 🚀 阅读 [DEPLOY.md](./DEPLOY.md) 了解部署详情

---

## 获取帮助

遇到问题？

1. 查看文档目录
2. 搜索 [GitHub Issues](https://github.com/DaZiDian/dazidian.github.io/issues)
3. 提交新的 Issue
4. 发送邮件至 dz1d07@outlook.com

---

**祝你使用愉快！** 🎉

如果这个项目对你有帮助，欢迎给个 Star ⭐

