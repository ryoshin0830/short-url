'use client';

import { useEffect, useState } from 'react';

export default function RedirectComponent({ originalUrl }: { originalUrl: string }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // リダイレクトのタイマー（3秒）
    const duration = 3000;
    const redirectTimer = setTimeout(() => {
      window.location.href = originalUrl;
    }, duration);
    
    // プログレスバーのアニメーション
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed >= duration) {
        clearInterval(progressInterval);
      }
    }, 16); // 約60fpsのアップデート
    
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(progressInterval);
    };
  }, [originalUrl]);
  
  // リンクのドメイン部分のみを取得
  const domain = (() => {
    try {
      const url = new URL(originalUrl);
      return url.hostname;
    } catch {
      return originalUrl;
    }
  })();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 animate-fade-in">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">if</span>
            </div>
            <div className="font-semibold text-xl text-gray-800 dark:text-white">.gy</div>
          </div>
          
          <div className="w-8 h-8 animate-pulse rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* コンテンツ部分 */}
        <div className="p-6">
          {/* アイコンによるリダイレクト表示 */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="h-0.5 w-12 bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="relative p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                
                <div
                  className="absolute inset-0 bg-blue-500 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
                  style={{ opacity: progress / 100 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* URLプレビュー（テキスト最小化） */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-600 flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="p-4 overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 dark:text-gray-200 font-mono text-sm">
              {originalUrl}
            </div>
          </div>
          
          {/* ドメイン表示 + 進行状況インジケーター */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{domain}</span>
            </div>
            
            {/* シンプルな進行状況表示 */}
            <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="mt-2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 追加のアニメーション要素 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* グローバルスタイル */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}