// app/[id]/page.tsx
import { getOriginalUrl } from '@/lib/db';
import { redirect } from 'next/navigation';
import RedirectComponent from './RedirectComponent';

// TypeScriptの型チェックを緩和
// @ts-expect-error - Next.js 15の型定義の変更に対応するため
export default async function RedirectPage({ params }) {
  // Next.js 15では params を await する必要がある
  const { id } = await params;
  
  // IDが文字列なのでそのまま渡す
  // 数字IDかカスタムパスかは getOriginalUrl 内で判定される
  
  try {
    // データベースから元のURLを取得
    const originalUrl = await getOriginalUrl(id);
    
    if (!originalUrl) {
      // URLが見つからない場合はホームページにリダイレクト
      redirect('/');
    }
    
    // 別のクライアントコンポーネントを使用してリダイレクトを実行
    return <RedirectComponent originalUrl={originalUrl} />;
  } catch (error) {
    console.error('リダイレクト中にエラーが発生しました:', error);
    redirect('/');
  }
}