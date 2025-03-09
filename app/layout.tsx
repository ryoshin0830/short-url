import { Suspense } from 'react';
import { initializeDatabase } from '@/lib/db';
import '../src/app/globals.css';

export const metadata = {
  title: 'if.gy | 革新的テクノロジーと言語の融合',
  description: '言語とAIの力で未来を切り拓くプロジェクト集。京都大学博士課程の梁 震が手がける革新的なデジタルソリューション。',
  keywords: 'AI, 機械学習, NLP, 言語教育, テクノロジー, プロジェクト紹介, URL短縮',
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
