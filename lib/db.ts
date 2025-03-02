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
    console.log('データベーステーブルが初期化されました');
  } catch (error) {
    console.error('データベースの初期化に失敗しました:', error);
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