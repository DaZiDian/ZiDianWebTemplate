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
    // 使用Vercel Postgres
    const postgres = await import('@vercel/postgres');
    
    // 优先使用 pooled connection，如果没有则使用 direct connection
    let sql;
    if (process.env.POSTGRES_URL) {
      // 使用 pooled connection
      sql = postgres.sql;
    } else if (process.env.POSTGRES_URL_NON_POOLING) {
      // 使用 direct connection
      const client = postgres.createClient();
      sql = client.sql.bind(client);
    } else {
      throw new Error('未配置 POSTGRES_URL 或 POSTGRES_URL_NON_POOLING 环境变量');
    }

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
    return res.status(500).json({
      success: false,
      error: '服务器错误，请稍后再试',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
