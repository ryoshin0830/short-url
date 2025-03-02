// scripts/check-db.js
// 環境変数を読み込む
require('dotenv').config({ path: '.env.local' });

const { sql } = require('@vercel/postgres');

async function checkDatabase() {
  try {
    console.log('🔄 データベース接続のテスト中...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');
    console.log('POSTGRES_URL:', process.env.POSTGRES_URL?.substring(0, 30) + '...');
    
    // 接続テスト
    const testResult = await sql`SELECT 1 as test`;
    console.log('✅ データベース接続成功:', testResult.rows[0]);
    
    // テーブル存在チェック
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    console.log('📋 データベース内のテーブル一覧:');
    for (const table of tables.rows) {
      console.log(`- ${table.table_name}`);
    }
    
    // shortened_urlsテーブルが存在するか確認
    const shortenedUrlsExists = tables.rows.some(
      table => table.table_name === 'shortened_urls'
    );
    
    if (shortenedUrlsExists) {
      // テーブル構造を確認
      const columns = await sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'shortened_urls'
        ORDER BY ordinal_position;
      `;
      
      console.log('📊 shortened_urlsテーブルの構造:');
      for (const column of columns.rows) {
        console.log(`- ${column.column_name} (${column.data_type})`);
      }
      
      // データサンプルを取得
      const sampleData = await sql`
        SELECT * FROM shortened_urls LIMIT 5;
      `;
      
      console.log('🔍 shortened_urlsテーブルのサンプルデータ:', 
        sampleData.rows.length ? sampleData.rows : '(データなし)');
    } else {
      console.log('❌ shortened_urlsテーブルが存在しません。テーブルを作成する必要があります。');
    }
  } catch (error) {
    console.error('❌ データベース接続/クエリ中にエラーが発生しました:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabase(); 