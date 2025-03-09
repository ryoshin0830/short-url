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
    name: 'ChatBot',
    url: 'https://chat.if.gy',
    icon: '/chatbot-icon.svg',
    description: '次世代AI対話プラットフォーム',
    longDescription: 'マルチタスク処理に対応した高度なAIチャットボット。最先端の自然言語処理技術を活用し、複雑な会話、タスク管理、情報検索を一つのインターフェースで実現します。',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.05)',
    textColor: '#10B981',
    tags: ['AI', 'NLP', 'React']
  },
  {
    name: 'CorpusMaker',
    url: 'https://corpusmaker.eastlinker.com',
    icon: '/corpus-icon.svg',
    description: '革新的なコーパス生成ツール',
    longDescription: 'PDFドキュメントから高品質なテキストコーパスを自動生成。言語研究、機械学習モデルのトレーニング、テキスト分析に最適化された、直感的で効率的なデータセット作成を実現します。',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.05)',
    textColor: '#8B5CF6',
    tags: ['Python', 'NLP', 'PDF解析']
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
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-3 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
        >
          INNOVATION
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"
        >
          未来を創るプロジェクト
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          言語とテクノロジーの融合から生まれる次世代デジタルエクスペリエンス
        </motion.p>
      </div>

      {/* クリエイター紹介 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-indigo-900/30 rounded-2xl p-8 mb-16 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-4xl font-bold text-white">ZL</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">梁 震（Zhen Liang）</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              京都大学博士課程で外国語教育と機械学習の融合研究に従事。2023年に株式会社EastLinkerを創業し、言語教育向けのテクノロジーソリューションを開発しています。日中バイリンガルとしての視点と、NLP・機械学習の専門知識を活かした革新的なプロジェクトを国際的に展開中。
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Machine Learning</span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">NLP</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">Full Stack</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">Language Education</span>
            </div>
          </div>
        </div>
      </motion.div>

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
            className="group relative h-full"
          >
            <Link 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div 
                className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-full flex flex-col"
                style={{ 
                  background: `linear-gradient(135deg, white, ${project.bgColor})`,
                  borderTop: `3px solid ${project.color}`
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/0 to-white/20 dark:from-gray-900/0 dark:to-gray-800/20 z-0"></div>
                
                <div className="relative p-8 z-10 flex-1 flex flex-col">
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 mr-5 flex-shrink-0 p-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: project.bgColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={project.color} strokeWidth={2}>
                          {project.name === 'ChatBot' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          )}
                          {project.name === 'CorpusMaker' && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div 
                      className="py-2 px-5 rounded-full text-sm font-medium transition-all duration-300"
                      style={{ 
                        backgroundColor: `${project.bgColor}`,
                        color: project.textColor,
                      }}
                    >
                      詳細を見る
                    </div>
                    
                    <motion.div 
                      className="flex items-center text-sm font-medium"
                      style={{ color: project.textColor }}
                      whileHover={{ x: 5 }}
                    >
                      <span>サイトを開く</span>
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