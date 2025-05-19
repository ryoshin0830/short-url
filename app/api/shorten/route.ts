// app/api/shorten/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/db';
import { ApiResponse } from '@/types';

interface ShortenRequestBody {
  url: string;
  customPath?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json() as ShortenRequestBody;
    let { url } = body;
    const { customPath } = body;
    
    // URLが空でないことを確認
    if (!url || url.trim() === '') {
      return NextResponse.json(
        { error: 'URLを入力してください' },
        { status: 400 }
      );
    }
    
    // カスタムパスのバリデーション
    if (customPath) {
      // 英数字、ハイフン、アンダースコアのみを許可
      if (!/^[a-zA-Z0-9_-]+$/.test(customPath)) {
        return NextResponse.json(
          { error: 'カスタムパスには英数字、ハイフン、アンダースコアのみ使用できます' },
          { status: 400 }
        );
      }
      
      // 予約語をチェック（例：api, about などの既存パス）
      const reservedPaths = ['api', 'about', 'database', 'admin', 'login', 'register', 'settings'];
      if (reservedPaths.includes(customPath.toLowerCase())) {
        return NextResponse.json(
          { error: 'このカスタムパスは予約されています' },
          { status: 400 }
        );
      }
      
      // 長さ制限を設定
      if (customPath.length < 3 || customPath.length > 30) {
        return NextResponse.json(
          { error: 'カスタムパスは3〜30文字にしてください' },
          { status: 400 }
        );
      }
    }
    
    // URLがhttpまたはhttpsで始まっていなければ、httpsを付与
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    
    // データベースに保存
    const result = await createShortUrl(url, customPath);
    
    // ショートリンクを生成
    const shortUrl = result.customPath 
      ? `https://if.gy/${result.customPath}` 
      : `https://if.gy/${result.id}`;
    
    return NextResponse.json({ 
      shortUrl,
      customPath: result.customPath || undefined
    });
  } catch (error) {
    console.error('URL短縮に失敗しました:', error);
    
    if (error instanceof Error && error.message === 'このカスタムパスは既に使用されています') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'URL短縮中にエラーが発生しました' },
      { status: 500 }
    );
  }
}