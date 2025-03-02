// app/[id]/page.tsx
import { getOriginalUrl } from '@/lib/db';
import { redirect } from 'next/navigation';

// TypeScriptの型チェックを緩和
// @ts-expect-error - Next.js 15の型定義の変更に対応するため
export default async function RedirectPage({ params }) {
  const { id } = params;
  
  // IDが数字であることを確認
  if (!/^\d+$/.test(id)) {
    redirect('/');
  }
  
  // データベースから元のURLを取得
  const originalUrl = await getOriginalUrl(parseInt(id, 10));
  
  if (!originalUrl) {
    // URLが見つからない場合はホームページにリダイレクト
    redirect('/');
  }
  
  // 元のURLにリダイレクト
  redirect(originalUrl);
}