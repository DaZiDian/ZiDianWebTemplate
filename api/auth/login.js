// 登录认证 API
import { hashPassword, verifyPassword, generateToken, getStoredPasswordHash } from '../utils/auth.js';

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { password } = req.body;

    // 验证输入
    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: '密码不能为空',
      });
    }

    // 获取存储的密码哈希
    const storedHash = getStoredPasswordHash();

    // 验证密码
    const isValid = verifyPassword(password, storedHash);

    if (!isValid) {
      // 添加延迟防止暴力破解（即使密码错误也等待一段时间）
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.status(401).json({
        success: false,
        error: '密码错误，请重试',
      });
    }

    // 密码正确，生成 JWT token
    const token = generateToken({
      role: 'admin',
      loginTime: Date.now(),
    });

    return res.status(200).json({
      success: true,
      data: {
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: '登录失败，请稍后重试',
    });
  }
}

