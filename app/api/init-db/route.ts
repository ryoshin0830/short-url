import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // 初期化処理を実行
    await initializeDatabase();
    
    // 現在のテーブル構造を取得してレスポンスに含める
    const columns = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'shortened_urls'
      ORDER BY ordinal_position;
    `;
    
    // レコード数を取得
    const countResult = await sql`
      SELECT COUNT(*) as count FROM shortened_urls;
    `;
    
    // インデックスの情報を取得
    const indexes = await sql`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'shortened_urls';
    `;
    
    return NextResponse.json({
      success: true,
      message: 'データベースが初期化されました',
      structure: {
        columns: columns.rows,
        recordCount: countResult.rows[0].count,
        indexes: indexes.rows.map(idx => idx.indexname)
      }
    });
  } catch (error) {
    console.error('データベース初期化中にエラーが発生しました:', error);
    return NextResponse.json(
      { 
        error: 'データベース初期化中にエラーが発生しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 