# 🗄️ Vercel Postgres 数据库设置指南

## 步骤 1：在 Vercel 创建 Postgres 数据库

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击顶部的 **Storage** 标签
3. 点击 **Create Database**
4. 选择 **Postgres**
5. 选择区域（建议选择离你最近的）
6. 点击 **Create**

## 步骤 2：连接数据库到项目

1. 在 Storage 页面找到刚创建的数据库
2. 点击 **Connect Project**
3. 选择你的项目 `dazidian.github.io`
4. 点击 **Connect**

Vercel 会自动添加以下环境变量到你的项目：
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 步骤 3：安装依赖

```bash
npm install @vercel/postgres
```

## 步骤 4：部署

```bash
git add .
git commit -m "feat: add serverless API for guestbook"
git push origin main
```

Vercel 会自动重新部署。

## 步骤 5：测试

部署完成后，访问：
- `https://你的域名.vercel.app/api/messages` - 应该返回空的留言列表
- 在留言板提交留言，刷新页面应该能看到留言

## 🎉 完成！

现在你的留言板已经连接到真实的数据库了！

## 💡 注意事项

1. Vercel Postgres 免费版限制：
   - 256 MB 存储
   - 60 小时计算时间/月
   - 足够个人网站使用

2. 如果超出免费额度，可以考虑：
   - 升级 Vercel Pro
   - 使用其他免费数据库（Supabase、PlanetScale等）

## 🔧 数据库管理

在 Vercel Dashboard 的 Storage 页面，你可以：
- 查看数据库连接信息
- 使用 SQL 编辑器直接查询
- 查看使用量统计

