// lib/db.ts
import { sql } from '@vercel/postgres';
import { ShortenedUrl } from '@/types';

// データベースの初期化
export async function initializeDatabase(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS shortened_urls (
        id SERIAL PRIMARY KEY,
        original_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        visits INTEGER DEFAULT 0
      );
    `;
    
    // パスキー用のテーブルは不要になりました
    
    console.log('データベーステーブルが初期化されました');
  } catch (error) {
    console.error('データベースの初期化に失敗しました:', error);
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

// 新しいショートリンクの作成
export async function createShortUrl(originalUrl: string): Promise<number> {
  try {
    const result = await sql<{ id: number }>`
      INSERT INTO shortened_urls (original_url)
      VALUES (${originalUrl})
      RETURNING id;
    `;
    return result.rows[0].id;
  } catch (error) {
    console.error('ショートリンクの作成に失敗しました:', error);
    throw error;
  }
}

// IDから元のURLを取得
export async function getOriginalUrl(id: number): Promise<string | null> {
  try {
    const result = await sql<{ original_url: string }>`
      UPDATE shortened_urls
      SET visits = visits + 1
      WHERE id = ${id}
      RETURNING original_url;
    `;
    
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