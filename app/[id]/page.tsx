// app/[id]/page.tsx
import { getOriginalUrl } from '@/lib/db';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
  params: {
    id: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
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