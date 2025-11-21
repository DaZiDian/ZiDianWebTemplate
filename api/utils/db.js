// 数据库连接工具函数
// 支持 Vercel Postgres 和 Prisma Postgres

export async function getDatabaseClient() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  
  if (!connectionString) {
    throw new Error('未配置 POSTGRES_URL 或 POSTGRES_URL_NON_POOLING 环境变量');
  }
  
  // 检查是否是 Prisma Postgres
  const isPrismaPostgres = connectionString.includes('db.prisma.io') || 
                           connectionString.includes('prisma-data.net') ||
                           connectionString.includes('prisma+postgres://');
  
  // 检查是否是 pooled connection
  const isPooledConnection = connectionString.includes('?pgbouncer=true') || 
                             connectionString.includes('&pgbouncer=true');
  
  console.log('数据库连接检测:', {
    isPrismaPostgres,
    isPooledConnection,
    hasNonPooling: !!process.env.POSTGRES_URL_NON_POOLING
  });
  
  // 如果是 Prisma Postgres 或不是 pooled connection，使用原生 pg 客户端
  if (isPrismaPostgres || !isPooledConnection) {
    const { default: pg } = await import('pg');
    const { Pool } = pg;
    
    const pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      },
      max: 1 // Serverless 环境建议使用 1 个连接
    });
    
    // 创建 sql 模板标签函数
    const sql = (strings, ...values) => {
      let paramIndex = 1;
      const processedValues = [];
      
      const text = strings.reduce((acc, str, i) => {
        if (i < values.length) {
          const value = values[i];
          // 如果是 sql 模板标签的结果（用于 sql.join），直接插入
          if (value && typeof value === 'object' && value.text && value.values) {
            // 这是一个嵌套的 sql 查询片段
            const nestedText = value.text.replace(/\$\d+/g, () => `$${paramIndex++}`);
            processedValues.push(...value.values);
            return acc + str + nestedText;
          } else if (Array.isArray(value)) {
            // PostgreSQL 数组格式
            processedValues.push(value);
            return acc + str + `$${paramIndex++}::text[]`;
          } else {
            processedValues.push(value);
            return acc + str + `$${paramIndex++}`;
          }
        }
        return acc + str;
      }, '');
      
      return pool.query({
        text,
        values: processedValues
      });
    };
    
    // 添加 array 辅助函数（返回数组本身，sql 函数会处理）
    sql.array = (arr) => {
      return arr;
    };
    
    // 添加 join 辅助函数（模拟 @vercel/postgres 的 sql.join）
    sql.join = (fragments, separator) => {
      if (!Array.isArray(fragments) || fragments.length === 0) {
        return { text: '', values: [] };
      }
      
      let combinedText = '';
      const combinedValues = [];
      let paramIndex = 1;
      
      fragments.forEach((fragment, index) => {
        if (fragment && typeof fragment === 'object' && fragment.text && fragment.values) {
          // 这是一个 sql 模板标签的结果
          const fragmentText = fragment.text.replace(/\$\d+/g, () => `$${paramIndex++}`);
          combinedText += fragmentText;
          combinedValues.push(...fragment.values);
        } else if (typeof fragment === 'string') {
          combinedText += fragment;
        }
        
        if (index < fragments.length - 1) {
          // 添加分隔符
          if (separator && typeof separator === 'object' && separator.text) {
            const sepText = separator.text.replace(/\$\d+/g, () => `$${paramIndex++}`);
            combinedText += sepText;
            combinedValues.push(...(separator.values || []));
          } else {
            combinedText += separator || ', ';
          }
        }
      });
      
      return { text: combinedText, values: combinedValues };
    };
    
    return {
      sql,
      pool,
      query: (text, params) => pool.query(text, params),
      end: () => pool.end()
    };
  } else {
    // 使用 Vercel Postgres（pooled connection）
    const postgres = await import('@vercel/postgres');
    return {
      sql: postgres.sql,
      pool: null,
      query: null,
      end: null
    };
  }
}

