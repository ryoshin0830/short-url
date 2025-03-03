import { Suspense } from 'react';
import { initializeDatabase } from '@/lib/db';
import '../src/app/globals.css';

export const metadata = {
  title: '梁 震 | if.gy - ポータルサイト',
  description: '梁震のポータルサイトとURL短縮サービス。ポートフォリオ、プロジェクト、URL短縮など。',
  keywords: 'URL短縮, 短縮URL, 梁震, ポートフォリオ, プロジェクト, 開発者',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // データベースの初期化（アプリケーション起動時に一度実行）
  await initializeDatabase();
  
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap" />
      </head>
      <body className="antialiased">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50">
            <div className="relative">
              <div className="animate-spin h-16 w-16 border-4 border-blue-400 rounded-full border-t-transparent"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-xl">if</span>
                </div>
              </div>
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
