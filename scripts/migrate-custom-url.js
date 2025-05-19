// scripts/migrate-custom-url.js
// 環境変数を読み込む
require('dotenv').config({ path: '.env.local' });

const { sql } = require('@vercel/postgres');

async function migrateDatabase() {
  try {
    console.log('🔄 カスタムURL対応のためのデータベースマイグレーションを開始します...');
    
    // custom_pathカラムの追加（すでに存在する場合はスキップ）
    console.log('1. custom_pathカラムの追加...');
    try {
      await sql`
        ALTER TABLE shortened_urls 
        ADD COLUMN IF NOT EXISTS custom_path TEXT UNIQUE;
      `;
      console.log('✅ custom_pathカラムを追加しました');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ custom_pathカラムは既に存在します');
      } else {
        throw error;
      }
    }
    
    // カスタムパスに対するインデックスの作成
    console.log('2. カスタムパスのインデックス作成...');
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_custom_path 
        ON shortened_urls (custom_path);
      `;
      console.log('✅ カスタムパスのインデックスを作成しました');
    } catch (error) {
      console.error('⚠️ インデックス作成中にエラーが発生しました:', error);
    }
    
    // テーブル構造の確認
    const columns = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'shortened_urls'
      ORDER BY ordinal_position;
    `;
    
    console.log('📊 更新後のテーブル構造:');
    for (const column of columns.rows) {
      console.log(`- ${column.column_name} (${column.data_type})`);
    }
    
    // インデックスの確認
    const indexes = await sql`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'shortened_urls';
    `;
    
    console.log('📊 テーブルのインデックス:');
    for (const index of indexes.rows) {
      console.log(`- ${index.indexname}: ${index.indexdef}`);
    }
    
    console.log('✅ マイグレーション完了');
  } catch (error) {
    console.error('❌ マイグレーション中にエラーが発生しました:', error);
  } finally {
    process.exit(0);
  }
}

migrateDatabase();