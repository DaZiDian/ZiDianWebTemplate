// Vercel Serverless Function - 留言 API (CommonJS)
const { sql } = require('@vercel/postgres');

// 初始化数据库表（仅在表不存在时创建）
async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        avatar TEXT,
        nickname VARCHAR(100),
        gender VARCHAR(10),
        birthday DATE,
        email VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database table initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

module.exports = async function handler(req, res) {
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
      const { rows } = await sql`
        SELECT * FROM messages 
        ORDER BY created_at DESC 
        LIMIT 100
      `;
      
      return res.status(200).json({
        success: true,
        data: rows
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
      const { rows } = await sql`
        INSERT INTO messages (avatar, nickname, gender, birthday, email, content)
        VALUES (${avatar || ''}, ${nickname || '游客'}, ${gender || ''}, ${birthday || null}, ${email || ''}, ${content})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        data: rows[0]
      });
    }

    // 不支持的方法
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    return res.status(500).json({
      success: false,
      error: '服务器错误，请稍后再试',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

