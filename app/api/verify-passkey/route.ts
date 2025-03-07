import { NextRequest, NextResponse } from 'next/server';
import { verifyPasskey } from '@/lib/db';

interface VerifyPasskeyRequestBody {
  passkey: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as VerifyPasskeyRequestBody;
    const { passkey } = body;
    
    if (!passkey) {
      return NextResponse.json(
        { error: 'パスキーが入力されていません' },
        { status: 400 }
      );
    }
    
    const isValid = await verifyPasskey(passkey);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'パスキーが無効です' },
        { status: 401 }
      );
    }
    
    // 認証成功時は認証トークンを返す
    // 実際のプロダクションでは、より安全なJWTなどを使用するべき
    const token = Buffer.from(`${passkey}-${Date.now()}`).toString('base64');
    
    return NextResponse.json({ 
      success: true,
      token
    });
  } catch (error) {
    console.error('パスキー検証中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'パスキー検証中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 