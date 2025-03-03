'use client';

// app/page.tsx
import UrlShortener from '@/components/UrlShortener';
import MobileNav from '@/components/MobileNav';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // クライアントサイドのみで現在の年を設定
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    // ダークモードの設定を確認
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
    
    // スクロールアニメーション
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animate');
      scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示時にも実行
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // テーマの切り替え
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };
  
  // プロジェクトデータ
  const projects = [
    {
      id: 'about',
      name: 'ポートフォリオ',
      url: 'https://about.if.gy',
      icon: '/file.svg',
      description: '梁震のポートフォリオサイト',
      color: 'from-emerald-500 to-teal-500',
      hoverColor: 'group-hover:from-emerald-600 group-hover:to-teal-600'
    },
    {
      id: 'url-shortener',
      name: 'URL短縮サービス',
      url: '#shortener',
      icon: '/vercel.svg',
      description: '長いURLを短く、共有しやすく変換するサービス',
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'group-hover:from-blue-600 group-hover:to-indigo-600',
      isLocal: true,
      onClick: () => setActiveTab('shortener')
    },
    {
      id: 'chat',
      name: 'チャットボット',
      url: 'https://chat.if.gy',
      icon: '/window.svg',
      description: 'AI搭載の会話型アシスタント',
      color: 'from-violet-500 to-purple-500',
      hoverColor: 'group-hover:from-violet-600 group-hover:to-purple-600'
    },
    {
      id: 'hawkOCR',
      name: 'HawkOCR',
      url: 'https://hawkOCR.if.gy',
      icon: '/globe.svg',
      description: 'PDFからコーパスを作成するウェブアプリ',
      color: 'from-amber-500 to-orange-500',
      hoverColor: 'group-hover:from-amber-600 group-hover:to-orange-600'
    }
  ];
  
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500`}>
      {/* 背景アニメーション要素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-blue-300/20 dark:from-blue-900/20 dark:to-blue-800/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute right-1/3 top-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-200/30 to-teal-300/20 dark:from-teal-900/20 dark:to-teal-800/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 bottom-1/4 w-[700px] h-[700px] bg-gradient-to-br from-sky-200/30 to-cyan-300/20 dark:from-sky-900/20 dark:to-cyan-800/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/30 to-green-300/20 dark:from-emerald-900/20 dark:to-green-800/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-6000"></div>
        
        {/* 追加の装飾要素 */}
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-300/40 to-pink-300/30 dark:from-purple-800/20 dark:to-pink-900/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-amber-300/40 to-orange-300/30 dark:from-amber-800/20 dark:to-orange-900/10 rounded-full blur-xl animate-float-reverse"></div>
      </div>
      
      {/* ヘッダー */}
      <header className="w-full py-6 z-20">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            {/* ロゴ */}
            <motion.div 
              className="flex items-center space-x-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-400 dark:from-blue-600 dark:to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse-subtle">
                <span className="text-white font-bold text-2xl">if</span>
              </div>
              <span className="text-3xl font-semibold text-gray-800 dark:text-white">.gy</span>
            </motion.div>
            
            {/* デスクトップナビゲーション */}
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium relative px-3 py-2 ${
                  activeTab === 'home' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ホーム
                {activeTab === 'home' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    layoutId="navIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-medium relative px-3 py-2 ${
                  activeTab === 'projects' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                プロジェクト
                {activeTab === 'projects' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    layoutId="navIndicator"
                  ></motion.div>
                )}
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('shortener')}
                className={`text-sm font-medium relative px-3 py-2 ${
                  activeTab === 'shortener' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                URL短縮
                {activeTab === 'shortener' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    layoutId="navIndicator"
                  ></motion.div>
                )}
              </motion.button>
              <motion.a 
                href="https://about.if.gy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium relative px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                梁震について
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
            
            {/* モバイルナビゲーション */}
            <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* 右側のアクション */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </nav>
        </div>
      </header>
      
      {activeTab === 'home' && (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-16 z-10">
          <div className="text-center mb-16 relative">
            <motion.div
              className="absolute -top-20 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 opacity-50 filter blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -top-10 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-blue-300 to-green-400 opacity-40 filter blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 270, 180, 90, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-6xl sm:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 relative z-10"
            >
              梁 震
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mb-8"
            ></motion.div>

            <motion.div
              className="relative max-w-2xl mx-auto text-xl text-gray-600 z-10 overflow-hidden"
            >
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                言語
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                の
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                壁
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                を
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                越える
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeOut"
                }}
                className="inline-block text-blue-500 font-bold"
              >
                革新的
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                な
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.7,
                  ease: "easeOut"
                }}
                className="inline-block text-teal-500 font-bold"
              >
                学習支援
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                システムを開発しています
              </motion.span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.isLocal ? undefined : project.url}
                onClick={project.onClick}
                target={project.isLocal ? undefined : "_blank"}
                rel={project.isLocal ? undefined : "noopener noreferrer"}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 dark:bg-black dark:opacity-10"></div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -left-6 -top-6 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse animation-delay-2000"></div>
                  </div>
                  <img src={project.icon} alt={project.name} className="h-20 w-20 text-white filter invert opacity-90 group-hover:scale-110 transition-transform duration-300 z-10" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                </div>
                <div className="mt-auto p-6 pt-0">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    <span className="text-sm font-medium">サイトを訪問する</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20"
          >
            <motion.button
              onClick={() => setActiveTab('shortener')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center text-lg">
                URL短縮機能を使う
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      )}
      
      {activeTab === 'projects' && (
        <div className="w-full max-w-5xl mx-auto py-16 z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.h2
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="text-4xl sm:text-5xl font-bold mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
            >
              プロジェクト一覧
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"
            ></motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.id !== 'url-shortener').map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 1 }}
                animate={{ 
                  y: [0, -3, 0],
                  transition: { 
                    repeat: Infinity, 
                    duration: 3,
                    delay: index * 0.5,
                    ease: "easeInOut" 
                  }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-br ${project.color} p-3 rounded-lg mr-4`}>
                    <img src={project.icon} alt="" className="h-6 w-6 text-white filter invert" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center text-blue-600">
                  <span className="text-sm font-medium">詳細を見る</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'shortener' && (
        <div className="w-full max-w-5xl mx-auto z-10 py-12">
          <div className="text-center mb-16 relative">
            <motion.div
              className="absolute -top-20 right-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-green-300 to-blue-400 opacity-30 filter blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 opacity-30 filter blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 270, 180, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 relative z-10 inline-block"
            >
              短くて、簡単なURL共有
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mb-8"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 relative z-10"
            >
              長いURLを短く、シンプルに。使いやすいインターフェースで素早くURLを短縮
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
              {[
                { title: '高速処理', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { title: 'APIアクセス', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                { title: '統計データ', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { title: '安全なリンク', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
                  initial={{ opacity: 1 }}
                  animate={{ 
                    y: [0, -5, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 3,
                      delay: index * 0.5,
                      ease: "easeInOut" 
                    }
                  }}
                  whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="max-w-lg mx-auto relative">
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-blue-400 opacity-10 filter blur-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-purple-400 opacity-10 filter blur-lg"
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -10, 0],
                y: [0, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <UrlShortener />
            </motion.div>
          </div>
        </div>
      )}
      
      <footer className="w-full py-12 mt-auto z-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <motion.div 
                className="flex items-center space-x-1 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">if</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">.gy</span>
              </motion.div>
              <p className="text-sm text-gray-500 max-w-xs">
                高品質かつ高機能なオンラインサービスを提供することで、よりシンプルで直感的なウェブ体験を追求します。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">サービス</h3>
              <ul className="space-y-2">
                <li>
                  <motion.button
                    onClick={() => setActiveTab('shortener')}
                    className="text-gray-500 hover:text-blue-600 text-sm"
                    whileHover={{ x: 2 }}
                  >
                    URL短縮
                  </motion.button>
                </li>
                <li>
                  <a href="https://about.if.gy" className="text-gray-500 hover:text-blue-600 text-sm">ポートフォリオ</a>
                </li>
                <li>
                  <a href="https://chat.if.gy" className="text-gray-500 hover:text-blue-600 text-sm">チャットボット</a>
                </li>
                <li>
                  <a href="https://hawkOCR.if.gy" className="text-gray-500 hover:text-blue-600 text-sm">HawkOCR</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://about.if.gy" className="text-gray-500 hover:text-blue-600 text-sm">梁震について</a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">プライバシーポリシー</a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">利用規約</a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">お問い合わせ</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {currentYear} 梁 震 | if.gy. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
            </div>
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
          animation: blob 12s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animation-delay-8000 {
          animation-delay: 8s;
        }
      `}</style>
    </main>
  );
}