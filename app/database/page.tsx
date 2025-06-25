'use client';

import { useState, useEffect } from 'react';
import { AuthState } from '@/types';
import PasskeyForm from '@/components/PasskeyForm';
import UrlList from '@/components/UrlList';
import Link from 'next/link';

export default function DatabasePage() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    token: null
  });

  // ページロード時にローカルストレージから認証状態を復元
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setAuth({
        isAuthenticated: true,
        token: storedToken
      });
    }
  }, []);

  // 認証成功時の処理
  const handleAuthenticated = (token: string) => {
    // トークンをローカルストレージに保存して状態を更新
    localStorage.setItem('auth_token', token);
    setAuth({
      isAuthenticated: true,
      token
    });
  };

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setAuth({
      isAuthenticated: false,
      token: null
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-1/3 top-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 bottom-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <header className="w-full py-4 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Link href="/" className="flex items-center space-x-1 text-gray-800 dark:text-white">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">link</span>
                </div>
                <span className="text-xl font-semibold">.ryosh.in</span>
              </Link>
            </div>

            {auth.isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                ログアウト
              </button>
            )}
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto mt-8 z-10 max-w-6xl">
        {auth.isAuthenticated && auth.token ? (
          <UrlList token={auth.token} />
        ) : (
          <PasskeyForm onAuthenticated={handleAuthenticated} />
        )}
      </div>
      
      <footer className="w-full py-8 mt-auto z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} link.ryosh.in. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
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
      `}</style>
    </main>
  );
} 