'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// AIサービス情報の型定義
interface AIService {
  name: string;
  url: string;
  icon: string;
  description: string;
  longDescription: string;
  color: string;
  bgColor: string;
  textColor: string;
}

// AIサービスのリスト
const aiServices: AIService[] = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: '/chatgpt-6.svg',
    description: 'OpenAIの対話型AIアシスタント',
    longDescription: '自然言語処理技術を駆使して、会話や文章生成、コード作成などを行える次世代のAIアシスタント。常に最新情報で学習を重ね、あらゆる質問に答えます。',
    color: '#10A37F',
    bgColor: 'rgba(16, 163, 127, 0.05)',
    textColor: '#10A37F'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: '/claude-ai-icon.svg',
    description: 'Anthropicの高性能AIアシスタント',
    longDescription: '安全性と有用性を重視して設計された対話型AIアシスタント。複雑な質問への丁寧な回答や、長文の要約、文章作成などが得意です。',
    color: '#5436DA',
    bgColor: 'rgba(84, 54, 218, 0.05)',
    textColor: '#5436DA'
  }
];

export default function AIServices() {
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
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-3 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
        >
          トレンド
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
        >
          最先端のAIサービス
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          最新のAI技術を活用して、あなたの生産性と創造性を高めましょう
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {aiServices.map((service) => (
          <motion.div 
            key={service.name}
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.2 } 
            }}
            className="group relative"
          >
            <Link 
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div 
                className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, white, ${service.bgColor})`,
                  borderTop: `3px solid ${service.color}`
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/0 to-white/20 dark:from-gray-900/0 dark:to-gray-800/20 z-0"></div>
                
                <div className="relative p-8 z-10">
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 mr-5 flex-shrink-0 p-1">
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={56}
                        height={56}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.longDescription}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div 
                      className="py-2 px-5 rounded-full text-sm font-medium transition-all duration-300"
                      style={{ 
                        backgroundColor: `${service.bgColor}`,
                        color: service.textColor,
                      }}
                    >
                      今すぐ試す
                    </div>
                    
                    <motion.div 
                      className="flex items-center text-sm font-medium"
                      style={{ color: service.textColor }}
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
                  style={{ color: service.color }}
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