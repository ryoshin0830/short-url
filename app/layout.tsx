import { Suspense } from 'react';
import { initializeDatabase } from '@/lib/db';
import '../src/app/globals.css';
import { Inter } from 'next/font/google';

// 洗練されたInterフォントを使用（SF Proに近い雰囲気を表現）
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'if.gy | 革新的テクノロジーと言語の融合',
  description: '言語とAIの力で未来を切り拓くプロジェクト集。洗練されたデザインと革新的な機能で、次世代のデジタルエクスペリエンスを提供します。',
  keywords: 'AI, 機械学習, NLP, 言語教育, テクノロジー, プロジェクト紹介, URL短縮',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/apple-touch-icon.png' }
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // データベースの初期化（アプリケーション起動時に一度実行）
  await initializeDatabase();
  
  return (
    <html lang="ja" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0066CC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased font-sans bg-white text-gray-800 tracking-tight leading-normal">
        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="w-16 h-16 relative">
              <div className="animate-spin origin-center flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666" 
                    stroke="#0066CC" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        }>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          
          <footer className="py-12 px-4 sm:px-6 md:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">if.gy</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
                    革新的なテクノロジーを通じて、言語とAIの融合を目指します。
                    あらゆる人々が言語の壁を超えて繋がる未来を創造します。
                  </p>
                  <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} if.gy All rights reserved.
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">プロジェクト</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">URL短縮</a></li>
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">翻訳ツール</a></li>
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">AIプロダクト</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">リソース</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">プライバシーポリシー</a></li>
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">利用規約</a></li>
                    <li><a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">お問い合わせ</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </Suspense>
      </body>
    </html>
  );
}
