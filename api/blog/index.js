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
    const pool = db.pool;
    const query = db.query || ((text, params) => sql.unsafe ? sql.unsafe(text, params) : pool.query(text, params));

    // 初始化数据库表 - 先检查并更新tags列类型
    if (pool) {
      // 创建表
      await pool.query(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(500) NOT NULL,
          content TEXT NOT NULL,
          tags TEXT[] DEFAULT '{}',
          status VARCHAR(20) DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // 检查并更新tags列类型（如果需要）
      try {
        await pool.query(`
          ALTER TABLE blog_posts 
          ALTER COLUMN tags TYPE JSONB 
          USING CASE 
            WHEN tags IS NULL THEN '[]'::jsonb 
            WHEN array_length(tags, 1) IS NULL THEN '[]'::jsonb 
            ELSE array_to_json(tags)::jsonb 
          END
        `);
      } catch (alterError) {
        // 如果列已经是JSONB类型或其他错误，继续执行
        console.log('tags列类型更新跳过或失败:', alterError.message);
      }
    } else {
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(500) NOT NULL,
          content TEXT NOT NULL,
          tags JSONB DEFAULT '[]',
          status VARCHAR(20) DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

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

      // 插入新文章 - 兼容处理，支持TEXT[]和JSONB两种格式
      const tagsArray = Array.isArray(tags) ? tags : [];
      
      let result;
      if (pool) {
        // 使用原生PostgreSQL客户端 - 尝试插入JSONB，失败则使用TEXT[]
        try {
          const insertQuery = `
            INSERT INTO blog_posts (slug, title, content, tags, status)
            VALUES ($1, $2, $3, $4::jsonb, $5)
            RETURNING *
          `;
          const insertValues = [slug, title, content, JSON.stringify(tagsArray), status || 'draft'];
          result = await pool.query(insertQuery, insertValues);
        } catch (jsonbError) {
          // 如果JSONB插入失败，使用TEXT[]格式
          console.log('JSONB插入失败，使用TEXT[]格式:', jsonbError.message);
          const insertQuery = `
            INSERT INTO blog_posts (slug, title, content, tags, status)
            VALUES ($1, $2, $3, $4::text[], $5)
            RETURNING *
          `;
          const insertValues = [slug, title, content, tagsArray, status || 'draft'];
          result = await pool.query(insertQuery, insertValues);
        }
      } else {
        // 使用 Vercel Postgres
        result = await sql`
          INSERT INTO blog_posts (slug, title, content, tags, status)
          VALUES (${slug}, ${title}, ${content}, ${JSON.stringify(tagsArray)}::jsonb, ${status || 'draft'})
          RETURNING *
        `;
      }
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

      // 构建更新语句 - 简化处理
      const updateParts = [];
      const updateValues = [];
      let paramIndex = 1;
      
      if (slug) {
        updateParts.push(`slug = $${paramIndex++}`);
        updateValues.push(slug);
      }
      if (title) {
        updateParts.push(`title = $${paramIndex++}`);
        updateValues.push(title);
      }
      if (content) {
        updateParts.push(`content = $${paramIndex++}`);
        updateValues.push(content);
      }
      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [];
        // 先尝试JSONB格式，失败则使用TEXT[]格式
        updateParts.push(`tags = $${paramIndex++}`);
        updateValues.push(tagsArray); // 直接使用数组，让数据库处理
      }
      if (status) {
        updateParts.push(`status = $${paramIndex++}`);
        updateValues.push(status);
      }
      updateParts.push(`updated_at = CURRENT_TIMESTAMP`);
      
      // 添加 id 参数
      updateValues.push(id);
      
      let result;
      if (pool) {
        const updateQuery = `
          UPDATE blog_posts 
          SET ${updateParts.join(', ')}
          WHERE id = $${paramIndex}
          RETURNING *
        `;
        
        // 尝试执行更新，处理tags类型不匹配的问题
        try {
          result = await pool.query(updateQuery, updateValues);
        } catch (updateError) {
          if (updateError.message.includes('text[] but expression is of type')) {
            // 如果是类型不匹配，重新构建查询
            console.log('检测到tags类型不匹配，调整查询...');
            const newUpdateParts = [];
            const newUpdateValues = [];
            let newParamIndex = 1;
            
            if (slug) {
              newUpdateParts.push(`slug = $${newParamIndex++}`);
              newUpdateValues.push(slug);
            }
            if (title) {
              newUpdateParts.push(`title = $${newParamIndex++}`);
              newUpdateValues.push(title);
            }
            if (content) {
              newUpdateParts.push(`content = $${newParamIndex++}`);
              newUpdateValues.push(content);
            }
            if (tags) {
              const tagsArray = Array.isArray(tags) ? tags : [];
              newUpdateParts.push(`tags = $${newParamIndex++}::text[]`);
              newUpdateValues.push(tagsArray);
            }
            if (status) {
              newUpdateParts.push(`status = $${newParamIndex++}`);
              newUpdateValues.push(status);
            }
            newUpdateParts.push(`updated_at = CURRENT_TIMESTAMP`);
            newUpdateValues.push(id);
            
            const newUpdateQuery = `
              UPDATE blog_posts 
              SET ${newUpdateParts.join(', ')}
              WHERE id = $${newParamIndex}
              RETURNING *
            `;
            result = await pool.query(newUpdateQuery, newUpdateValues);
          } else {
            throw updateError;
          }
        }
      } else {
        // 使用 Vercel Postgres
        // 构建动态SQL查询
        let updateSql = 'UPDATE blog_posts SET ';
        const setParts = [];
        const values = [];
        
        if (slug) {
          setParts.push(`slug = ${sql`${slug}`}`);
        }
        if (title) {
          setParts.push(`title = ${sql`${title}`}`);
        }
        if (content) {
          setParts.push(`content = ${sql`${content}`}`);
        }
        if (tags) {
          const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);
          setParts.push(`tags = ${sql`${tagsJson}`}::jsonb`);
        }
        if (status) {
          setParts.push(`status = ${sql`${status}`}`);
        }
        setParts.push('updated_at = CURRENT_TIMESTAMP');
        
        result = await sql`
          UPDATE blog_posts 
          SET ${sql.unsafe(setParts.join(', '))}
          WHERE id = ${id}
          RETURNING *
        `;
      }
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
