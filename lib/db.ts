// lib/db.ts
import { sql } from '@vercel/postgres';
import { ShortenedUrl } from '@/types';
import * as crypto from 'crypto';

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

    // パスキー用のテーブルを初期化
    await sql`
      CREATE TABLE IF NOT EXISTS passkeys (
        id SERIAL PRIMARY KEY,
        passkey_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // デフォルトのパスキーがなければ作成
    const defaultPasskey = process.env.DEFAULT_PASSKEY || 'admin123';
    const passkeysExist = await sql`SELECT COUNT(*) FROM passkeys`;
    
    if (parseInt(passkeysExist.rows[0].count) === 0) {
      await createPasskey(defaultPasskey);
    }
    
    console.log('データベーステーブルが初期化されました');
  } catch (error) {
    console.error('データベースの初期化に失敗しました:', error);
  }
}

// パスキーを作成
export async function createPasskey(passkey: string): Promise<void> {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPasskey(passkey, salt);
    
    await sql`
      INSERT INTO passkeys (passkey_hash, salt)
      VALUES (${hash}, ${salt});
    `;
    
    console.log('パスキーが作成されました');
  } catch (error) {
    console.error('パスキーの作成に失敗しました:', error);
    throw error;
  }
}

// パスキーをハッシュ化
function hashPasskey(passkey: string, salt: string): string {
  return crypto.pbkdf2Sync(passkey, salt, 1000, 64, 'sha512').toString('hex');
}

// パスキーを検証
export async function verifyPasskey(passkey: string): Promise<boolean> {
  try {
    const result = await sql`SELECT * FROM passkeys ORDER BY created_at DESC LIMIT 1`;
    
    if (result.rows.length === 0) {
      return false;
    }
    
    const storedPasskey = result.rows[0];
    const hash = hashPasskey(passkey, storedPasskey.salt);
    
    return hash === storedPasskey.passkey_hash;
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