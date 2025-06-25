// components/UrlShortener.tsx
'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { ApiResponse } from '@/types';

export default function UrlShortener() {
  const [url, setUrl] = useState<string>('');
  const [customPath, setCustomPath] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showApiInfo, setShowApiInfo] = useState<boolean>(false);
  const [showCustomOptions, setShowCustomOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);
    setIsCopied(false);
    
    try {
      const payload: { url: string; customPath?: string } = { url };
      
      // カスタムパスが入力されている場合のみ追加
      if (showCustomOptions && customPath.trim() !== '') {
        payload.customPath = customPath.trim();
      }
      
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json() as ApiResponse;
      
      if (!response.ok) {
        throw new Error(data.error || 'URL短縮中にエラーが発生しました');
      }
      
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('URL短縮中にエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const handleCustomPathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomPath(e.target.value);
  };
  
  const toggleCustomOptions = () => {
    setShowCustomOptions(!showCustomOptions);
  };
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        // URL入力欄にコピーされたエフェクトを適用
        const inputElement = document.querySelector('.url-card');
        if (inputElement) {
          inputElement.classList.add('copied');
          setTimeout(() => inputElement.classList.remove('copied'), 500);
        }
        
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        alert('コピーに失敗しました。手動でコピーしてください。');
      });
  };
  
  const toggleApiInfo = () => {
    setShowApiInfo(!showApiInfo);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md mx-auto glass-effect animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
            URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              id="url"
              value={url}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white shadow-sm custom-url-input"
              placeholder="example.com または https://example.com"
              required
            />
          </div>
        </div>
        
        <div className="mt-3">
          <button 
            type="button" 
            onClick={toggleCustomOptions}
            className="text-blue-600 dark:text-blue-400 text-sm flex items-center focus:outline-none hover:underline button-effect"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 transition-transform duration-300 ${showCustomOptions ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            カスタムURL設定
          </button>
        </div>
        
        {showCustomOptions && (
          <div className="mt-2 overflow-hidden animate-slide-down">
            <div className="border p-4 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <label htmlFor="customPath" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                カスタムパス（オプション）
              </label>
              
              <div className="input-group flex mb-2 items-center bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600 overflow-hidden shadow-sm">
                <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm select-none">
                  https://link.ryosh.in/
                </div>
                <input
                  type="text"
                  id="customPath"
                  value={customPath}
                  onChange={handleCustomPathChange}
                  className="flex-1 min-w-0 block w-full border-0 bg-transparent px-3 py-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white custom-url-input"
                  placeholder="my-custom-link"
                />
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                英数字、ハイフン、アンダースコアのみ使用可能（1〜30文字）
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                数字のみのパスは使用できません（例: 123）
              </p>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-base disabled:opacity-70 disabled:cursor-not-allowed button-effect"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              処理中...
            </div>
          ) : '短縮URLを生成する'}
        </button>
      </form>
      
      {error && (
        <div className="error-message mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-start animate-shake">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {shortUrl && (
        <div className="mt-6 overflow-hidden animate-scale-in">
          <div className="success-message mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">短縮URL 生成完了</h3>
          </div>
          
          <div className="mb-2">
            <div className="flex w-full rounded-lg overflow-hidden border-2 border-green-500 dark:border-green-600">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 pl-4 py-3 bg-white dark:bg-gray-700 dark:text-white focus:outline-none text-md font-medium custom-url-input success border-0"
              />
              <button
                onClick={handleCopyClick}
                className="flex-shrink-0 w-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 focus:outline-none button-effect"
              >
                {isCopied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse-subtle" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                )}
              </button>
            </div>
            
            {isCopied && (
              <div className="mt-1 text-center text-green-600 dark:text-green-400 text-xs py-1 animate-fade-in">
                コピーしました！
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center animate-slide-up">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            短縮URLをSNSやメールで共有できます
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleApiInfo}
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none button-effect"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 transition-transform duration-300 ${showApiInfo ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {showApiInfo ? 'API情報を隠す' : 'API経由で利用する方法を見る'}
        </button>
        
        {showApiInfo && (
          <div className="mt-4 overflow-hidden animate-slide-down">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm glass-effect">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-gradient">API仕様</h4>
              <div className="mb-3">
                <code className="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 text-xs">
                  POST /api/shorten
                </code>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-600 dark:text-gray-400 mb-1">リクエスト:</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded-md overflow-x-auto text-xs">
{`fetch('https://link.ryosh.in/api/shorten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    url: "example.com", // httpsなしでも可能
    customPath: "my-custom-path" // オプション
  })
})`}
                </pre>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">レスポンス:</p>
                <pre className="bg-gray-800 text-blue-400 p-3 rounded-md overflow-x-auto text-xs">
{`{
  "shortUrl": "https://link.ryosh.in/abc123"
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* URLテキストボックスの強調スタイル */
        .custom-url-input {
          transition: all 0.2s ease-in-out;
        }
        .custom-url-input:hover {
          border-color: #4f85e5;
        }
        /* 入力中のホバー効果を消さない */
        .custom-url-input:focus:hover {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}