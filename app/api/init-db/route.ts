import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initializeDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'データベースが初期化されました'
    });
  } catch (error) {
    console.error('データベース初期化中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'データベース初期化中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 