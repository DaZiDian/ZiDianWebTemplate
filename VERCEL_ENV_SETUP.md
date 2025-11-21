# Vercel 环境变量配置指南

## 问题诊断

根据错误日志，问题是：
```
invalid_connection_string: This connection string is meant to be used with a direct connection. 
Make sure to use a pooled connection string or try `createClient()` instead.
```

## 解决方案

代码已修复，现在可以自动检测并使用正确的连接方式。但您需要在 Vercel 中配置正确的环境变量。

## 配置步骤

### 1. 访问 Vercel 项目设置

**URL**: https://vercel.com/dashboard

1. 登录 Vercel 控制台
2. 找到您的项目：`dazidian.github.io` 或 `dazd.me`
3. 点击项目进入详情页
4. 点击顶部菜单 **Settings**（设置）
5. 在左侧菜单选择 **Environment Variables**（环境变量）

### 2. 检查现有环境变量

您应该能看到以下环境变量之一：

- ✅ `POSTGRES_URL` - Pooled connection string（推荐）
- ✅ `POSTGRES_URL_NON_POOLING` - Direct connection string

### 3. 如果使用 Vercel Postgres

如果您已经创建了 Vercel Postgres 数据库：

1. 在 Vercel 控制台，点击 **Storage**（存储）标签
2. 找到您的 Postgres 数据库
3. 点击数据库名称进入详情页
4. 在 **.env.local** 标签页，您会看到：
   - `POSTGRES_URL` - 用于 pooled connection
   - `POSTGRES_URL_NON_POOLING` - 用于 direct connection

### 4. 添加环境变量

**推荐配置**（使用 pooled connection，性能更好）：

1. 在 **Environment Variables** 页面
2. 点击 **Add New**（添加新变量）
3. 添加以下变量：

   - **Key**: `POSTGRES_URL`
   - **Value**: 从 Postgres 数据库详情页复制的 `POSTGRES_URL` 值
   - **Environment**: 选择 `Production`、`Preview`、`Development`（全选）

**或者**（如果只有 direct connection string）：

1. 添加以下变量：

   - **Key**: `POSTGRES_URL_NON_POOLING`
   - **Value**: 从 Postgres 数据库详情页复制的 `POSTGRES_URL_NON_POOLING` 值
   - **Environment**: 选择 `Production`、`Preview`、`Development`（全选）

### 5. 重新部署

配置完环境变量后：

1. 返回项目主页
2. 点击 **Deployments**（部署）标签
3. 找到最新的部署记录
4. 点击右侧的 **...** 菜单
5. 选择 **Redeploy**（重新部署）

或者，代码已自动修复，下次推送代码时会自动重新部署。

## 验证配置

部署完成后，测试以下端点：

1. **留言墙 API**: `https://www.dazd.me/api/messages` (GET)
   - 应该返回: `{"success":true,"data":[]}`

2. **博客 API**: `https://www.dazd.me/api/blog` (GET)
   - 应该返回: `{"success":true,"data":[]}`

## 如果还没有创建 Postgres 数据库

1. 在 Vercel 控制台，点击 **Storage**（存储）标签
2. 点击 **Create Database**（创建数据库）
3. 选择 **Postgres**
4. 选择计划（Hobby 计划免费）
5. 创建数据库后，按照上面的步骤 3-4 配置环境变量

## 注意事项

- 环境变量配置后，需要重新部署才能生效
- 确保环境变量在所有环境（Production、Preview、Development）中都配置了
- 代码已自动修复，可以同时支持 pooled 和 direct connection

