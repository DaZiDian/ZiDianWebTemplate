// 数据库连接工具函数
// 支持多种数据库: Vercel Postgres, Cloudflare D1, H2, MySQL, MongoDB, Redis, SQLite

/**
 * 获取数据库客户端
 * 根据 DATABASE_TYPE 环境变量选择相应的数据库连接方式
 */
export async function getDatabaseClient() {
  const dbType = process.env.DATABASE_TYPE || 'vercel';
  
  console.log('数据库类型:', dbType);
  
  switch (dbType.toLowerCase()) {
    case 'vercel':
    case 'postgres':
      return await getVercelPostgresClient();
    
    case 'cloudflare':
    case 'd1':
      return await getCloudflareD1Client();
    
    case 'h2':
      return await getH2Client();
    
    case 'mysql':
      return await getMySQLClient();
    
    case 'mongodb':
      return await getMongoDBClient();
    
    case 'redis':
      return await getRedisClient();
    
    case 'sqlite':
      return await getSQLiteClient();
    
    default:
      console.warn(`未知的数据库类型: ${dbType}，使用默认的 Vercel Postgres`);
      return await getVercelPostgresClient();
  }
}

/**
 * Vercel Postgres / Prisma Postgres 客户端
 */
async function getVercelPostgresClient() {
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
  
  console.log('Postgres 连接检测:', {
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
    
    return createPostgresClient(pool);
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

/**
 * Cloudflare D1 客户端
 * 注意: D1 需要通过 Cloudflare Workers 访问
 */
async function getCloudflareD1Client() {
  // Cloudflare D1 在 Workers 环境中通过 env.DB 访问
  // 这里提供一个适配器，实际使用时需要根据 Cloudflare Workers 环境调整
  throw new Error('Cloudflare D1 需要通过 Cloudflare Workers 环境访问。请参考 Cloudflare Workers 文档。');
}

/**
 * H2 Database 客户端
 */
async function getH2Client() {
  // H2 是 Java 数据库，Node.js 需要使用 JDBC 桥接
  // 这里需要安装相应的包，例如: better-sqlite3 或通过 Java 桥接
  throw new Error('H2 Database 支持需要安装额外的依赖。请参考 H2 Database Node.js 驱动文档。');
}

/**
 * MySQL 客户端
 */
async function getMySQLClient() {
  const mysql = await import('mysql2/promise');
  
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl: process.env.MYSQL_SSL === 'true' ? {} : false
  });
  
  // 创建 SQL 模板标签函数（适配 MySQL）
  const sql = (strings, ...values) => {
    let query = strings[0];
    for (let i = 0; i < values.length; i++) {
      query += '?' + strings[i + 1];
    }
    return connection.query(query, values);
  };
  
  return {
    sql,
    pool: connection,
    query: (text, params) => connection.query(text, params),
    end: () => connection.end()
  };
}

/**
 * MongoDB 客户端
 */
async function getMongoDBClient() {
  const { MongoClient } = await import('mongodb');
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('未配置 MONGODB_URI 环境变量');
  }
  
  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db(process.env.MONGODB_DATABASE);
  
  // MongoDB 使用不同的查询方式，这里提供一个适配器
  return {
    sql: null, // MongoDB 不使用 SQL
    pool: db,
    query: null,
    end: () => client.close(),
    // MongoDB 特定的方法
    collection: (name) => db.collection(name)
  };
}

/**
 * Redis 客户端
 */
async function getRedisClient() {
  const redis = await import('redis');
  
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379')
    },
    password: process.env.REDIS_PASSWORD || undefined,
    database: parseInt(process.env.REDIS_DB || '0')
  });
  
  await client.connect();
  
  // Redis 主要用于缓存，不直接用于 SQL 查询
  return {
    sql: null,
    pool: client,
    query: null,
    end: () => client.quit(),
    // Redis 特定的方法
    get: (key) => client.get(key),
    set: (key, value) => client.set(key, value)
  };
}

/**
 * SQLite 客户端
 */
async function getSQLiteClient() {
  const Database = (await import('better-sqlite3')).default;
  
  const dbPath = process.env.SQLITE_DATABASE_PATH || './data/database.db';
  const db = new Database(dbPath);
  
  // 创建 SQL 模板标签函数（适配 SQLite）
  const sql = (strings, ...values) => {
    let query = strings[0];
    const params = [];
    for (let i = 0; i < values.length; i++) {
      query += '?' + strings[i + 1];
      params.push(values[i]);
    }
    return db.prepare(query).run(...params);
  };
  
  return {
    sql,
    pool: db,
    query: (text, params) => db.prepare(text).run(...(params || [])),
    end: () => db.close()
  };
}

/**
 * 创建 PostgreSQL 客户端（通用函数）
 */
function createPostgresClient(pool) {

