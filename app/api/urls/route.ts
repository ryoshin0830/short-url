import { NextRequest, NextResponse } from 'next/server';
import { getAllUrls } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Authorization headerからトークンを取得
    const authHeader = request.headers.get('Authorization');
    
    // トークンが存在しない場合は401エラー
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }
    
    // トークンの検証はシンプルな実装
    // 実際のプロダクションではJWTなどの検証をするべき
    const token = authHeader.substring(7); // "Bearer "の後の部分を取得
    
    if (!token) {
      return NextResponse.json(
        { error: '無効なトークンです' },
        { status: 401 }
      );
    }
    
    // データベースからすべてのURLを取得
    const urls = await getAllUrls();
    
    return NextResponse.json({ urls });
  } catch (error) {
    console.error('URL一覧の取得中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'URL一覧の取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 