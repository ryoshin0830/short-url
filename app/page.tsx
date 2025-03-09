'use client';

// app/page.tsx
import UrlShortener from '@/components/UrlShortener';
import Projects from '@/components/Projects';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showUrlShortener, setShowUrlShortener] = useState(false);
  
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
              <motion.button
                onClick={() => setShowUrlShortener(!showUrlShortener)}
                whileHover={{ y: -2 }}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">URL短縮</span>
              </motion.button>
              
              <motion.a
                href="https://about.if.gy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-md transition-all duration-200"
              >
                <span>プロフィール</span>
              </motion.a>
            </motion.div>
          </nav>
        </div>
      </header>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-between gap-12 py-16 z-10">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
          >
            WELCOME TO IF.GY
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight"
          >
            <span className="block">テクノロジーで</span>
            <span className="block">未来を切り拓く</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            言語とAIの力を融合させた革新的なソリューションで、<br className="hidden md:block" />
            新たなデジタル体験を創造します
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#projects"
              className="py-3 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              プロジェクトを見る
            </a>
            <button
              onClick={() => setShowUrlShortener(true)}
              className="py-3 px-8 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg font-medium shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-1"
            >
              URL短縮を試す
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* URL短縮フォーム - トグルで表示/非表示 */}
      {showUrlShortener && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-24 right-4 z-50 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">URL短縮ツール</h3>
            <button 
              onClick={() => setShowUrlShortener(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <UrlShortener />
          </div>
        </motion.div>
      )}
      
      {/* プロジェクトセクション */}
      <div id="projects">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full z-10"
        >
          <Projects />
        </motion.div>
      </div>
      
      {/* ヒーローセクション下部のアクションカード */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full max-w-5xl mx-auto px-4 py-12 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">革新的なソリューション</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">最先端の技術と創造的な発想で、従来の枠組みを超える価値を提供します。</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">優れた使いやすさ</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">ユーザー体験を最優先に考え、直感的で簡単に操作できるデザインを追求します。</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">継続的な進化</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">フィードバックを大切にし、常に改善を重ねることで最高のサービスを提供します。</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <footer className="w-full py-12 mt-auto z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">if</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">.gy</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  革新的な技術と創造力で未来を形作るプロジェクト群。<br />
                  言語とAIの力で、より豊かな体験を提供します。
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {currentYear} if.gy. All rights reserved.
                </p>
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
                  <motion.a
                    href="https://about.if.gy"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    プロフィールを見る
                  </motion.a>
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
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </main>
  );
}