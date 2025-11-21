// Vercel Serverless Function 连接 CloudFlare D1 数据库
// 注意：CloudFlare D1需要通过CloudFlare Workers访问，这里改用Vercel Postgres作为替代方案
// 如果必须使用D1，需要创建CloudFlare Worker作为中间层

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
    // 使用统一的数据库连接工具
    const { getDatabaseClient } = await import('../utils/db.js');
    const db = await getDatabaseClient();
    const sql = db.sql;
    const pool = db.pool;

    // 初始化数据库表
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        avatar TEXT,
        nickname VARCHAR(100) DEFAULT '游客',
        gender VARCHAR(10),
        birthday DATE,
        email VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // GET - 获取所有留言
    if (req.method === 'GET') {
      let result;
      if (pool) {
        result = await pool.query(`
          SELECT * FROM messages 
          ORDER BY created_at DESC 
          LIMIT 100
        `);
      } else {
        result = await sql`
          SELECT * FROM messages 
          ORDER BY created_at DESC 
          LIMIT 100
        `;
      }
      const rows = result.rows || result;
      
      console.log('获取留言 - 返回数量:', rows.length); // 调试日志
      
      return res.status(200).json({
        success: true,
        data: rows
      });
    }

    // POST - 添加新留言
    if (req.method === 'POST') {
      const { avatar, nickname, gender, birthday, email, content } = req.body;

      console.log('接收到留言提交:', { nickname: nickname || '游客', content: content?.substring(0, 50) + '...' }); // 调试日志

      // 验证必填字段
      if (!content || content.trim() === '') {
        return res.status(400).json({
          success: false,
          error: '留言内容不能为空'
        });
      }

      // 插入留言
      let result;
      if (pool) {
        result = await pool.query(`
          INSERT INTO messages (avatar, nickname, gender, birthday, email, content)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `, [avatar || '', nickname || '游客', gender || '', birthday || null, email || '', content]);
      } else {
        result = await sql`
          INSERT INTO messages (avatar, nickname, gender, birthday, email, content)
          VALUES (${avatar || ''}, ${nickname || '游客'}, ${gender || ''}, ${birthday || null}, ${email || ''}, ${content})
          RETURNING *
        `;
      }
      const rows = result.rows || result;

      console.log('留言插入成功:', rows[0]?.id); // 调试日志

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
    console.error('Error code:', error.code);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      code: error.code
    });
    return res.status(500).json({
      success: false,
      error: '服务器错误，请稍后再试',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      errorCode: error.code || 'UNKNOWN'
    });
  }
}
