import { Suspense } from 'react';
import { initializeDatabase } from '@/lib/db';
import '../src/app/globals.css';

export const metadata = {
  title: 'if.gy | シンプルなURL短縮サービス',
  description: '長いURLを短く、使いやすく。APIも利用可能なモダンなURL短縮サービス',
  keywords: 'URL短縮, 短縮URL, URL変換, シンプル, API',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // データベースの初期化（アプリケーション起動時に一度実行）
  await initializeDatabase();
  
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent dark:border-t-transparent"></div>
          </div>
        }>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
