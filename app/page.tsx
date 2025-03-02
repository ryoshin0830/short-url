// app/page.tsx
import UrlShortener from '@/components/UrlShortener';
import { initializeDatabase } from '@/lib/db';

export default async function Home() {
  // データベースの初期化（アプリケーション起動時に一度実行）
  await initializeDatabase();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">if.gy</h1>
          <p className="text-lg text-gray-600">シンプルなURL短縮サービス</p>
        </div>
        
        <UrlShortener />
      </div>
    </main>
  );
}