# 认证系统配置指南

本文档说明如何配置博客管理后台的安全认证系统。

## 安全特性

- ✅ **密码哈希**: 使用 SHA-256 + 盐值对密码进行哈希存储
- ✅ **JWT Token**: 使用 JSON Web Token 进行身份验证
- ✅ **时间安全比较**: 防止时序攻击
- ✅ **Token 过期**: 支持配置 token 有效期
- ✅ **API 认证**: 所有修改操作（POST/PUT/DELETE）都需要认证

## 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

### 必需的环境变量

1. **ADMIN_PASSWORD_HASH** - 管理员密码的哈希值
2. **JWT_SECRET** - JWT 签名密钥（至少32个字符的随机字符串）

### 可选的环境变量

3. **PASSWORD_SALT** - 密码哈希盐值（默认使用开发环境值）
4. **JWT_EXPIRES_IN** - Token 有效期（默认: `24h`）

## 快速开始

### 1. 生成密码哈希

使用提供的脚本生成密码哈希：

```bash
node scripts/generate-password-hash.js <你的密码>
```

例如：
```bash
node scripts/generate-password-hash.js dazidian2024
```

脚本会输出：
- 密码哈希值
- 推荐的环境变量配置
- 生产环境推荐的新盐值

### 2. 生成 JWT_SECRET

生成一个安全的随机字符串作为 JWT 密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. 在 Vercel 中配置环境变量

1. 登录 Vercel Dashboard
2. 进入你的项目设置
3. 导航到 "Environment Variables" 页面
4. 添加以下变量：

```
ADMIN_PASSWORD_HASH=<从脚本生成的哈希值>
JWT_SECRET=<生成的随机字符串>
PASSWORD_SALT=<脚本生成的新盐值，可选>
JWT_EXPIRES_IN=24h
```

### 4. 重新部署

配置完环境变量后，重新部署项目以使配置生效。

## 默认配置（开发环境）

如果没有设置环境变量，系统会使用以下默认值：

- **默认密码**: `dazidian2024`
- **默认盐值**: `dazidian_blog_salt_change_in_production`
- **默认 JWT 密钥**: `dazidian_blog_admin_secret_key_change_in_production`
- **默认 Token 有效期**: `24h`

⚠️ **警告**: 默认配置仅用于开发环境，生产环境必须设置自定义的环境变量！

## 修改密码

如果需要修改管理员密码：

1. 使用脚本生成新密码的哈希值
2. 在 Vercel 环境变量中更新 `ADMIN_PASSWORD_HASH`
3. 重新部署项目

## 安全建议

1. **使用强密码**: 密码应至少包含12个字符，包含大小写字母、数字和特殊字符
2. **定期更换密码**: 建议每3-6个月更换一次密码
3. **保护环境变量**: 不要将环境变量提交到代码仓库
4. **使用 HTTPS**: 确保生产环境使用 HTTPS 传输
5. **限制 Token 有效期**: 根据安全需求调整 `JWT_EXPIRES_IN`
6. **监控登录活动**: 定期检查日志，发现异常登录行为

## API 端点

### POST /api/auth/login

登录接口，验证密码并返回 JWT token。

**请求体:**
```json
{
  "password": "你的密码"
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

### 受保护的 API

以下 API 端点需要携带有效的 JWT token（在 `Authorization` 头中）：

- `POST /api/blog` - 创建文章
- `PUT /api/blog` - 更新文章
- `DELETE /api/blog` - 删除文章

**请求头:**
```
Authorization: Bearer <JWT_TOKEN>
```

## 故障排除

### Token 验证失败

如果遇到 "未授权" 错误：

1. 检查 token 是否过期（默认24小时）
2. 检查 `JWT_SECRET` 环境变量是否正确设置
3. 重新登录获取新的 token

### 密码验证失败

如果无法登录：

1. 确认 `ADMIN_PASSWORD_HASH` 环境变量已正确设置
2. 确认 `PASSWORD_SALT` 与生成哈希时使用的盐值一致
3. 使用脚本重新生成密码哈希并更新环境变量

## 技术细节

### 密码哈希算法

- **算法**: SHA-256
- **加盐方式**: 密码 + 盐值拼接后哈希
- **输出格式**: 十六进制字符串

### JWT Token 结构

- **算法**: HS256 (HMAC SHA-256)
- **载荷**: `{ role: 'admin', loginTime: timestamp, iat: timestamp, exp: timestamp }`
- **有效期**: 可配置（默认24小时）

### 安全措施

- **时间安全比较**: 使用 `crypto.timingSafeEqual` 防止时序攻击
- **错误延迟**: 密码错误时延迟1秒响应，防止暴力破解
- **Token 验证**: 所有修改操作都验证 token 有效性

