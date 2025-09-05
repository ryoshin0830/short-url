// lib/db.ts
import { createPool } from '@vercel/postgres';
import { ShortenedUrl } from '@/types';

// DATABASE_URLを使用してプールを作成
const pool = createPool({
  connectionString: process.env.DATABASE_URL
});

const { sql } = pool;

// データベースの初期化
export async function initializeDatabase(): Promise<void> {
  try {
    // まず既存のテーブルが存在するか確認
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'shortened_urls'
      );
    `;
    
    // テーブルが存在する場合
    if (tableExists.rows[0].exists) {
      // カスタムパスカラムが存在するか確認
      const columnExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'shortened_urls' AND column_name = 'custom_path'
        );
      `;
      
      // カラムが存在しない場合は追加
      if (!columnExists.rows[0].exists) {
        await sql`
          ALTER TABLE shortened_urls 
          ADD COLUMN custom_path TEXT UNIQUE;
        `;
        console.log('custom_pathカラムを追加しました');
      }
      
      // インデックスの作成（すでに存在しても問題ない）
      await sql`
        CREATE INDEX IF NOT EXISTS idx_custom_path ON shortened_urls (custom_path);
      `;
      
      console.log('データベーステーブルが更新されました');
    } else {
      // テーブルが存在しない場合は新規作成
      await sql`
        CREATE TABLE IF NOT EXISTS shortened_urls (
          id SERIAL PRIMARY KEY,
          original_url TEXT NOT NULL,
          custom_path TEXT UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          visits INTEGER DEFAULT 0
        );
      `;
      
      // カスタムパスに対するインデックスを作成
      await sql`
        CREATE INDEX IF NOT EXISTS idx_custom_path ON shortened_urls (custom_path);
      `;
      
      console.log('データベーステーブルが新規作成されました');
    }
  } catch (error) {
    console.error('データベースの初期化に失敗しました:', error);
    // エラーをスローしないことで、アプリケーションの起動を妨げない
  }
}

// パスキーを検証 - 環境変数と直接比較
export async function verifyPasskey(passkey: string): Promise<boolean> {
  try {
    const validPasskey = process.env.DEFAULT_PASSKEY || 'admin123';
    return passkey === validPasskey;
  } catch (error) {
    console.error('パスキーの検証に失敗しました:', error);
    return false;
  }
}

// 新しいショートリンクの作成（カスタムパス対応）
export async function createShortUrl(originalUrl: string, customPath?: string): Promise<{ id: number; customPath: string | null }> {
  try {
    // カスタムパスが指定されている場合は既存のパスと衝突しないか確認
    if (customPath) {
      const existingPath = await sql<{ count: number }>`
        SELECT COUNT(*) as count FROM shortened_urls
        WHERE custom_path = ${customPath};
      `;
      
      if (existingPath.rows[0].count > 0) {
        throw new Error('このカスタムパスは既に使用されています');
      }
    }
    
    const result = await sql<{ id: number; custom_path: string | null }>`
      INSERT INTO shortened_urls (original_url, custom_path)
      VALUES (${originalUrl}, ${customPath || null})
      RETURNING id, custom_path;
    `;
    
    return {
      id: result.rows[0].id,
      customPath: result.rows[0].custom_path
    };
  } catch (error) {
    console.error('ショートリンクの作成に失敗しました:', error);
    throw error;
  }
}

// IDまたはカスタムパスから元のURLを取得
export async function getOriginalUrl(idOrPath: string | number): Promise<string | null> {
  try {
    let result;
    
    // 数値の場合はIDとして検索
    if (typeof idOrPath === 'number' || /^\d+$/.test(idOrPath)) {
      const id = typeof idOrPath === 'number' ? idOrPath : parseInt(idOrPath, 10);
      result = await sql<{ original_url: string }>`
        UPDATE shortened_urls
        SET visits = visits + 1
        WHERE id = ${id}
        RETURNING original_url;
      `;
    } else {
      // 文字列の場合はカスタムパスとして検索
      result = await sql<{ original_url: string }>`
        UPDATE shortened_urls
        SET visits = visits + 1
        WHERE custom_path = ${idOrPath}
        RETURNING original_url;
      `;
    }
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0].original_url;
  } catch (error) {
    console.error('元のURLの取得に失敗しました:', error);
    return null;
  }
}

// 統計データの取得 (オプション機能)
export async function getUrlStats(id: number): Promise<ShortenedUrl | null> {
  try {
    const result = await sql<ShortenedUrl>`
      SELECT * FROM shortened_urls
      WHERE id = ${id};
    `;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('統計データの取得に失敗しました:', error);
    return null;
  }
}

// すべてのショートリンクを取得
export async function getAllUrls(): Promise<ShortenedUrl[]> {
  try {
    const result = await sql<ShortenedUrl>`
      SELECT * FROM shortened_urls
      ORDER BY created_at DESC;
    `;
    
    return result.rows;
  } catch (error) {
    console.error('ショートリンク一覧の取得に失敗しました:', error);
    return [];
  }
}