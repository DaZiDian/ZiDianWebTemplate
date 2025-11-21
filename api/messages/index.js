// Vercel Serverless Function 连接 CloudFlare D1 数据库
import { createClient } from '@libsql/client';

// D1 数据库连接配置
const client = createClient({
  url: process.env.DATABASE_URL || 'libsql://dazidian-github-io-dazidian.turso.io',
  authToken: process.env.DATABASE_AUTH_TOKEN
});

// 初始化数据库表
async function initDatabase() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        avatar TEXT,
        nickname TEXT DEFAULT '游客',
        gender TEXT,
        birthday TEXT,
        email TEXT,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 初始化数据库
    await initDatabase();

    // GET - 获取所有留言
    if (req.method === 'GET') {
      const result = await client.execute(`
        SELECT * FROM messages 
        ORDER BY created_at DESC 
        LIMIT 100
      `);
      
      return res.status(200).json({
        success: true,
        data: result.rows
      });
    }

    // POST - 添加新留言
    if (req.method === 'POST') {
      const { avatar, nickname, gender, birthday, email, content } = req.body;

      // 验证必填字段
      if (!content || content.trim() === '') {
        return res.status(400).json({
          success: false,
          error: '留言内容不能为空'
        });
      }

      // 插入留言
      const result = await client.execute({
        sql: `INSERT INTO messages (avatar, nickname, gender, birthday, email, content)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          avatar || '', 
          nickname || '游客', 
          gender || '', 
          birthday || null, 
          email || '', 
          content
        ]
      });

      // 获取刚插入的记录
      const newMessage = await client.execute({
        sql: `SELECT * FROM messages WHERE id = ?`,
        args: [result.lastInsertRowid]
      });

      return res.status(201).json({
        success: true,
        data: newMessage.rows[0]
      });
    }

    // 不支持的方法
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: '服务器错误，请稍后再试',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
