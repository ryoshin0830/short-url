'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// プロジェクト情報の型定義
interface Project {
  name: string;
  url: string;
  icon: string;
  description: string;
  longDescription: string;
  color: string;
  bgColor: string;
  textColor: string;
  tags: string[];
}

// プロジェクトのリスト
const projects: Project[] = [
  {
    name: 'Portfolio',
    url: 'https://about.if.gy',
    icon: '/portfolio-icon.svg',
    description: '私のポートフォリオサイト',
    longDescription: '私のスキル、経験、プロジェクトをまとめたポートフォリオサイト。これまでの開発経験や得意分野、技術スタックなどを詳しく紹介しています。',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.05)',
    textColor: '#3B82F6',
    tags: ['Next.js', 'React', 'Tailwind CSS']
  },
  {
    name: 'ChatBot',
    url: 'https://chat.if.gy',
    icon: '/chatbot-icon.svg',
    description: 'マルチタスクが可能なChatBot',
    longDescription: '複数のタスクを同時に処理できる高度なChatBot。自然言語処理を活用して、会話やタスク管理、情報検索などを行えます。',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.05)',
    textColor: '#10B981',
    tags: ['AI', 'NLP', 'React']
  },
  {
    name: 'CorpusMaker',
    url: 'https://corpusmaker.eastlinker.com',
    icon: '/corpus-icon.svg',
    description: 'PDFファイルからコーパス作成ツール',
    longDescription: 'PDFファイルを解析して、テキストコーパスを作成するツール。文書分析や機械学習モデルのトレーニングに使用できるデータセットを簡単に生成できます。',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.05)',
    textColor: '#8B5CF6',
    tags: ['Python', 'NLP', 'PDF解析']
  },
  {
    name: 'ShortURL',
    url: '/',
    icon: '/shorturl-icon.svg',
    description: '短くて簡単なURL共有',
    longDescription: '長いURLを短く、シンプルに。使いやすいインターフェースで素早くURLを短縮し、共有できるサービスです。',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.05)',
    textColor: '#F59E0B',
    tags: ['Next.js', 'API', 'URL短縮']
  }
];

export default function Projects() {
  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-3 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
        >
          プロジェクト
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
        >
          私のプロジェクト集
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          開発してきた様々なアプリケーションやサービスをご紹介します
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.name}
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.2 } 
            }}
            className="group relative"
          >
            <Link 
              href={project.url}
              target={project.url === '/' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div 
                className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, white, ${project.bgColor})`,
                  borderTop: `3px solid ${project.color}`
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/0 to-white/20 dark:from-gray-900/0 dark:to-gray-800/20 z-0"></div>
                
                <div className="relative p-8 z-10">
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 mr-5 flex-shrink-0 p-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: project.bgColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={project.color} strokeWidth={2}>
                          {project.name === 'Portfolio' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          )}
                          {project.name === 'ChatBot' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          )}
                          {project.name === 'CorpusMaker' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          )}
                          {project.name === 'ShortURL' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          )}
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{project.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.longDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${project.bgColor}`,
                          color: project.textColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div 
                      className="py-2 px-5 rounded-full text-sm font-medium transition-all duration-300"
                      style={{ 
                        backgroundColor: `${project.bgColor}`,
                        color: project.textColor,
                      }}
                    >
                      {project.url === '/' ? '使ってみる' : '詳細を見る'}
                    </div>
                    
                    <motion.div 
                      className="flex items-center text-sm font-medium"
                      style={{ color: project.textColor }}
                      whileHover={{ x: 5 }}
                    >
                      <span>{project.url === '/' ? 'ここで使う' : 'サイトを開く'}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* 背景の装飾パターン */}
                <div 
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
                  style={{ color: project.color }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M20,50 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 Z" 
                      fill="currentColor" 
                      opacity="0.3"
                    />
                    <path 
                      d="M30,50 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 Z" 
                      fill="currentColor" 
                      opacity="0.6"
                    />
                    <path 
                      d="M40,50 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z" 
                      fill="currentColor" 
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>
            </Link>
            
            {/* ホバー時の光るエフェクト */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 rounded-2xl blur opacity-0 group-hover:opacity-70 group-hover:animate-shimmer transition duration-300"></div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* 追加のスタイリング */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -500px 0;
          }
          100% {
            background-position: 500px 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          background-size: 1000px 100%;
        }
      `}</style>
    </section>
  );
}