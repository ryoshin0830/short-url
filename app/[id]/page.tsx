// app/[id]/page.tsx
import { getOriginalUrl } from '@/lib/db';
import { redirect } from 'next/navigation';

// TypeScriptの型チェックを緩和
// @ts-expect-error - Next.js 15の型定義の変更に対応するため
export default async function RedirectPage({ params }) {
  // Next.js 15では params を await する必要がある
  const { id } = await params;
  
  // IDが数字であることを確認
  if (!/^\d+$/.test(id)) {
    redirect('/');
  }
  
  try {
    // データベースから元のURLを取得
    const originalUrl = await getOriginalUrl(parseInt(id, 10));
    
    if (!originalUrl) {
      // URLが見つからない場合はホームページにリダイレクト
      redirect('/');
    }
    
    // 遷移中を表示するために遷移ページをレンダリング
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`1;url=${originalUrl}`} />
          <script dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function() {
                window.location.href = "${originalUrl}";
              }, 1000);
            `
          }} />
          <style dangerouslySetInnerHTML={{
            __html: `
              body {
                margin: 0;
                padding: 0;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #f0f4ff, #e6f0ff);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
              }
              .container {
                text-align: center;
                padding: 2rem;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 1rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
                animation: fadeIn 0.5s ease-out;
              }
              .logo {
                font-size: 2rem;
                font-weight: bold;
                background: linear-gradient(to right, #3b82f6, #4f46e5);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                margin-bottom: 1rem;
              }
              .message {
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
                color: #4b5563;
              }
              .url {
                background: #f3f4f6;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                word-break: break-all;
                font-family: ui-monospace, monospace;
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
                color: #374151;
                border: 1px solid #e5e7eb;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .loader {
                width: 48px;
                height: 48px;
                border: 4px solid rgba(79, 70, 229, 0.2);
                border-left-color: #4f46e5;
                border-radius: 50%;
                display: inline-block;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
              }
              .progress-bar {
                width: 100%;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                margin-top: 1.5rem;
                overflow: hidden;
                position: relative;
              }
              .progress-bar::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: linear-gradient(to right, #3b82f6, #4f46e5);
                animation: progress 1s linear;
              }
              @keyframes rotation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0); }
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `
          }} />
        </head>
        <body>
          <div className="container">
            <div className="logo">if.gy</div>
            <div className="message">リダイレクト中...</div>
            <div className="url">{originalUrl}</div>
            <span className="loader"></span>
            <div className="progress-bar"></div>
          </div>
        </body>
      </html>
    );
  } catch (error) {
    console.error('リダイレクト中にエラーが発生しました:', error);
    redirect('/');
  }
}