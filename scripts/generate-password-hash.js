#!/usr/bin/env node
/**
 * 密码哈希生成工具
 * 用于生成管理员密码的哈希值，以便存储在环境变量中
 * 
 * 使用方法:
 *   node scripts/generate-password-hash.js <你的密码>
 * 
 * 示例:
 *   node scripts/generate-password-hash.js dazidian2024
 */

import crypto from 'crypto';
import readline from 'readline';

// 从命令行参数获取密码，或从环境变量获取
const args = process.argv.slice(2);
const password = args[0] || process.env.ADMIN_PASSWORD;

// 密码盐值（应与环境变量中的 PASSWORD_SALT 一致）
const salt = process.env.PASSWORD_SALT || 'dazidian_blog_salt_change_in_production';

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

function generateRandomSalt() {
  return crypto.randomBytes(32).toString('hex');
}

async function main() {
  let inputPassword = password;

  // 如果没有提供密码，提示用户输入
  if (!inputPassword) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    inputPassword = await new Promise((resolve) => {
      rl.question('请输入管理员密码: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  if (!inputPassword) {
    console.error('错误: 密码不能为空');
    process.exit(1);
  }

  // 生成密码哈希
  const passwordHash = hashPassword(inputPassword, salt);
  
  // 生成新的随机盐值（用于生产环境）
  const newSalt = generateRandomSalt();
  const hashWithNewSalt = hashPassword(inputPassword, newSalt);

  console.log('\n=== 密码哈希生成结果 ===\n');
  console.log('当前使用的盐值:', salt);
  console.log('密码哈希值:', passwordHash);
  console.log('\n--- 生产环境推荐配置 ---\n');
  console.log('新的随机盐值:', newSalt);
  console.log('使用新盐值的密码哈希:', hashWithNewSalt);
  console.log('\n=== 环境变量配置 ===\n');
  console.log('请在 Vercel 环境变量中设置以下值:\n');
  console.log(`ADMIN_PASSWORD_HASH="${passwordHash}"`);
  console.log(`PASSWORD_SALT="${salt}"`);
  console.log(`JWT_SECRET="<生成一个随机字符串，至少32个字符>"`);
  console.log(`JWT_EXPIRES_IN="24h"`);
  console.log('\n--- 生产环境推荐 ---\n');
  console.log(`ADMIN_PASSWORD_HASH="${hashWithNewSalt}"`);
  console.log(`PASSWORD_SALT="${newSalt}"`);
  console.log(`JWT_SECRET="<生成一个随机字符串，至少32个字符>"`);
  console.log(`JWT_EXPIRES_IN="24h"`);
  console.log('\n提示: 可以使用以下命令生成 JWT_SECRET:');
  console.log('  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
  console.log('\n');
}

main().catch((error) => {
  console.error('错误:', error);
  process.exit(1);
});

