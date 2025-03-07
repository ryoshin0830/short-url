// app/api/shorten/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/db';
import { ApiResponse } from '@/types';

interface ShortenRequestBody {
  url: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json() as ShortenRequestBody;
    let { url } = body;
    
    // URLが空でないことを確認
    if (!url || url.trim() === '') {
      return NextResponse.json(
        { error: 'URLを入力してください' },
        { status: 400 }
      );
    }
    
    // URLがhttpまたはhttpsで始まっていなければ、httpsを付与
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    
    // データベースに保存して数字のIDを取得
    const id = await createShortUrl(url);
    
    // ショートリンクを生成
    const shortUrl = `https://if.gy/${id}`;
    
    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('URL短縮に失敗しました:', error);
    return NextResponse.json(
      { error: 'URL短縮中にエラーが発生しました' },
      { status: 500 }
    );
  }
}