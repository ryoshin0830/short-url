'use client';

// app/page.tsx
import UrlShortener from '@/components/UrlShortener';
import AIServices from '@/components/AIServices';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // クライアントサイドのみで現在の年を設定
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 高級感のあるグラデーションブロブをさらに改善 */}
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-gradient-to-br from-blue-300 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-1/3 top-1/2 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 bottom-1/4 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-gradient-to-br from-emerald-300 to-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        
        {/* 洗練された背景要素を追加 */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-indigo-100 to-transparent opacity-20 dark:from-indigo-900 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-blue-100 to-transparent opacity-20 dark:from-blue-900 dark:to-transparent"></div>
        
        {/* 幾何学模様を追加 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]"></div>
      </div>
      
      <header className="w-full py-6 z-10">
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xl">if</span>
              </motion.div>
              <span className="text-2xl font-semibold text-gray-800 dark:text-white">.gy</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              <motion.a
                href="https://github.com/ryoshin0830/if-gy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                <span className="text-sm font-medium">GitHub</span>
              </motion.a>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-md transition-all duration-200"
              >
                <span>お問い合わせ</span>
              </motion.button>
            </motion.div>
          </nav>
        </div>
      </header>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-12 z-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight"
          >
            短くて、簡単な<br />URL共有
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            長いURLを短く、シンプルに。<br />
            使いやすいインターフェースで素早くURLを短縮
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              高速処理
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              安全なリンク
            </div>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2">
          <UrlShortener />
        </div>
      </div>
      
      {/* AIサービスセクションを追加 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full z-10"
      >
        <AIServices />
      </motion.div>
      
      <footer className="w-full py-12 mt-auto z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">if</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">.gy</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  簡単・安全・高速なURL短縮サービス。<br />
                  長いURLをシンプルに共有できます。
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {currentYear} if.gy. All rights reserved.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">リンク</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://about.if.gy" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                      開発者について
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                      利用規約
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">ソーシャル</h3>
                <div className="flex space-x-4 items-center">
                  <motion.a 
                    href="https://github.com/ryoshin0830" 
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://x.com/ryoshin0830" 
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">X (Twitter)</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://zenn.dev/ryoushin" 
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">Zenn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.587.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/>
                    </svg>
                  </motion.a>
                </div>
                
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    お問い合わせ
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
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
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* 背景パターン用のスタイルを追加 */
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </main>
  );
}