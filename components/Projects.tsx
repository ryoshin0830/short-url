'use client';

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
    color: '#0071E3',
    bgColor: 'rgba(0, 113, 227, 0.08)',
    textColor: '#0071E3',
    tags: ['AI', 'NLP', 'React']
  },
  {
    name: 'CorpusMaker',
    url: 'https://corpusmaker.eastlinker.com',
    icon: '/corpus-icon.svg',
    description: '革新的なコーパス生成ツール',
    longDescription: 'PDFドキュメントから高品質なテキストコーパスを自動生成。言語研究、機械学習モデルのトレーニング、テキスト分析に最適化された、直感的で効率的なデータセット作成を実現します。',
    color: '#FF2D55',
    bgColor: 'rgba(255, 45, 85, 0.08)',
    textColor: '#FF2D55',
    tags: ['Python', 'NLP', 'PDF解析']
  }
];

// アニメーション変数
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Projects() {
  return (
    <section className="w-full">
      <div className="container-fluid max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-4"
          >
            <span className="chip chip-primary">INNOVATION</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-apple-gray-900 mb-4"
          >
            未来を創る<span className="text-gradient">プロジェクト</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-apple-gray-600 max-w-3xl mx-auto"
          >
            言語とテクノロジーの融合から生まれる次世代デジタルエクスペリエンス
          </motion.p>
        </div>

        {/* プロジェクトグリッド */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="card hover-lift overflow-hidden border-0"
              style={{ 
                boxShadow: `0 10px 30px -10px ${project.bgColor}`,
                borderTop: `4px solid ${project.color}`
              }}
            >
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 glass"
                      style={{ backgroundColor: project.bgColor }}
                    >
                      <div className="text-xl" style={{ color: project.color }}>
                        {project.icon.endsWith('.svg') ? (
                          <img 
                            src={project.icon} 
                            alt={project.name} 
                            className="w-7 h-7"
                            onError={(e) => {
                              // SVGファイルが見つからない場合、頭文字を表示
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerText = project.name.charAt(0);
                              }
                            }}
                          />
                        ) : (
                          project.name.charAt(0)
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-medium text-apple-gray-900 mb-1">{project.name}</h3>
                        <svg className="ml-2 h-4 w-4 text-apple-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-apple-gray-500 text-sm">{project.description}</p>
                    </div>
                  </div>
                  
                  <p className="text-apple-gray-600 mb-6 flex-grow">{project.longDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="chip text-xs"
                        style={{ 
                          backgroundColor: `${project.bgColor}`,
                          color: project.textColor
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* もっと見るボタン */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            href="https://github.com/iflgy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary hover-lift inline-flex items-center space-x-2"
          >
            <span>GitHubで詳細を見る</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}