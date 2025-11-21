// Vercel Serverless Function - 博客文章 API
export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 使用统一的数据库连接工具
    const { getDatabaseClient } = await import('../utils/db.js');
    const db = await getDatabaseClient();
    const sql = db.sql;

    // 初始化数据库表
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[],
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // GET - 获取所有文章或单篇文章
    if (req.method === 'GET') {
      const { slug } = req.query;

      if (slug) {
        // 获取单篇文章
        const result = await sql`
          SELECT * FROM blog_posts 
          WHERE slug = ${slug}
          LIMIT 1
        `;
        const rows = result.rows || result;
        
        if (rows.length === 0) {
          return res.status(404).json({
            success: false,
            error: '文章不存在'
          });
        }

        return res.status(200).json({
          success: true,
          data: rows[0]
        });
      } else {
        // 获取所有文章
        const result = await sql`
          SELECT id, slug, title, tags, status, created_at, updated_at
          FROM blog_posts 
          ORDER BY updated_at DESC
        `;
        const rows = result.rows || result;
        
        return res.status(200).json({
          success: true,
          data: rows
        });
      }
    }

    // POST - 创建新文章
    if (req.method === 'POST') {
      const { slug, title, content, tags, status } = req.body;

      // 验证必填字段
      if (!slug || !title || !content) {
        return res.status(400).json({
          success: false,
          error: 'slug、标题和内容不能为空'
        });
      }

      // 检查slug是否已存在
      const { rows: existing } = await sql`
        SELECT id FROM blog_posts WHERE slug = ${slug} LIMIT 1
      `;

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          error: '该slug已存在，请使用不同的slug'
        });
      }

      // 插入新文章
      const tagsArray = Array.isArray(tags) ? tags : [];
      // 使用 PostgreSQL 数组类型而不是 JSONB
      const result = await sql`
        INSERT INTO blog_posts (slug, title, content, tags, status)
        VALUES (${slug}, ${title}, ${content}, ${sql.array(tagsArray)}, ${status || 'draft'})
        RETURNING *
      `;
      const rows = result.rows || result;

      return res.status(201).json({
        success: true,
        data: rows[0]
      });
    }

    // PUT - 更新文章
    if (req.method === 'PUT') {
      const { id, slug, title, content, tags, status } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: '文章ID不能为空'
        });
      }

      // 如果更新slug，检查新slug是否已被其他文章使用
      if (slug) {
        const existingResult = await sql`
          SELECT id FROM blog_posts WHERE slug = ${slug} AND id != ${id} LIMIT 1
        `;
        const existing = existingResult.rows || existingResult;

        if (existing.length > 0) {
          return res.status(409).json({
            success: false,
            error: '该slug已被其他文章使用'
          });
        }
      }

      // 使用模板字符串构建更新语句
      let updateFields = [];
      if (slug) updateFields.push(sql`slug = ${slug}`);
      if (title) updateFields.push(sql`title = ${title}`);
      if (content) updateFields.push(sql`content = ${content}`);
      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [];
        updateFields.push(sql`tags = ${sql.array(tagsArray)}`);
      }
      if (status) updateFields.push(sql`status = ${status}`);
      updateFields.push(sql`updated_at = CURRENT_TIMESTAMP`);

      const result = await sql`
        UPDATE blog_posts 
        SET ${sql.join(updateFields, sql`, `)}
        WHERE id = ${id}
        RETURNING *
      `;
      const rows = result.rows || result;

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: '文章不存在'
        });
      }

      return res.status(200).json({
        success: true,
        data: rows[0]
      });
    }

    // DELETE - 删除文章
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: '文章ID不能为空'
        });
      }

      const result = await sql`
        DELETE FROM blog_posts WHERE id = ${id}
      `;
      const rowCount = result.rowCount || (result.rows ? result.rows.length : 0);

      if (rowCount === 0) {
        return res.status(404).json({
          success: false,
          error: '文章不存在'
        });
      }

      return res.status(200).json({
        success: true,
        message: '文章已删除'
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
