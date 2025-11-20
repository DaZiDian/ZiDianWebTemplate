# 部署指南

## 部署到 Vercel

### 方法 1: 使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
# 在项目根目录执行
vercel

# 首次部署时会提示一些配置，按提示操作即可
# Set up and deploy "xxx"? [Y/n] y
# Which scope do you want to deploy to? 选择你的账户
# Link to existing project? [y/N] n
# What's your project's name? dazidian-website
# In which directory is your code located? ./
```

4. **部署到生产环境**
```bash
vercel --prod
```

### 方法 2: 通过 GitHub 自动部署

1. **将代码推送到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DaZiDian/dazidian.github.io.git
git push -u origin main
```

2. **在 Vercel 上导入项目**
   - 访问 https://vercel.com
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测到是 Vite 项目并配置构建设置

3. **配置构建设置（通常自动完成）**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成

5. **自动部署**
   - 之后每次推送到 main 分支，Vercel 都会自动部署

## 自定义域名

### 在 Vercel 上配置自定义域名

1. 进入项目设置
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

### DNS 配置示例

如果你的域名是 `dazidian.com`：

**A 记录**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 记录**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 环境变量配置

如果需要添加环境变量（如 API 密钥）：

1. 在 Vercel 项目设置中
2. 点击 "Environment Variables"
3. 添加变量名和值
4. 重新部署项目

## 性能优化建议

### 1. 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速

### 2. 代码优化
- 启用代码分割（已配置）
- 移除 console.log（已配置）
- 压缩 CSS 和 JS（已配置）

### 3. 缓存策略
在 `vercel.json` 中配置：
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 监控和分析

### Vercel Analytics

1. 在项目设置中启用 Analytics
2. 查看访问数据和性能指标

### Google Analytics（可选）

在 `index.html` 中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 故障排查

### 构建失败

1. **检查依赖**
```bash
npm install
npm run build
```

2. **查看 Vercel 构建日志**
   - 在 Vercel 项目页面查看详细错误信息

3. **常见问题**
   - Node.js 版本不匹配：在 `package.json` 中指定版本
   ```json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

### 404 错误

确保 `vercel.json` 中配置了路由重写：
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 样式不显示

检查 Tailwind CSS 配置和构建输出。

## 回滚到之前的版本

1. 在 Vercel 项目页面
2. 点击 "Deployments"
3. 找到之前的部署
4. 点击 "Promote to Production"

## 删除项目

1. 进入项目设置
2. 滚动到底部
3. 点击 "Delete Project"
4. 按提示确认删除

---

## 快速命令参考

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 预览构建
npm run preview

# 部署到 Vercel（开发环境）
vercel

# 部署到 Vercel（生产环境）
vercel --prod

# 查看部署列表
vercel ls

# 查看项目信息
vercel inspect
```

---

**提示**: 首次部署可能需要几分钟时间，请耐心等待。部署成功后，Vercel 会提供一个 `.vercel.app` 域名供你访问。

