// scripts/migrate-passkey.js
// パスキーのデータベース保存から環境変数ベースに移行するためのスクリプト
require('dotenv').config({ path: '.env.local' });

const { sql } = require('@vercel/postgres');

async function migratePasskey() {
  try {
    console.log('🔄 パスキーマイグレーションを開始します...');
    
    // passkeysテーブルが存在するか確認
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'passkeys'
      );
    `;
    
    if (tableExists.rows[0].exists) {
      console.log('📋 passkeysテーブルが見つかりました。削除します...');
      
      // テーブルを削除
      await sql`DROP TABLE IF EXISTS passkeys;`;
      console.log('✅ passkeysテーブルを削除しました。');
    } else {
      console.log('ℹ️ passkeysテーブルは存在しません。何もする必要はありません。');
    }
    
    console.log('✅ パスキーマイグレーションが完了しました。');
    console.log('ℹ️ これからは環境変数 DEFAULT_PASSKEY がそのまま認証に使用されます。');
    
  } catch (error) {
    console.error('❌ マイグレーション中にエラーが発生しました:', error);
  } finally {
    process.exit(0);
  }
}

migratePasskey(); 