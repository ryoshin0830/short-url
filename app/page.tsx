'use client';

// app/page.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import UrlShortener from '@/components/UrlShortener';
import Projects from '@/components/Projects';

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showUrlShortener, setShowUrlShortener] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // スクロールアニメーション用ref
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // パララックス効果用の変換
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // 現在の年を設定
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <>
      {/* ヘッダー - Appleスタイルの透明感のあるナビゲーション */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass elevation-1' : 'bg-transparent'}`}>
        <div className="container-fluid max-w-7xl mx-auto py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center">
                <span className="text-xl font-semibold tracking-tight">
                  <span className="text-gradient font-semibold">if.gy</span>
                </span>
              </div>
            </motion.div>
            
            <motion.nav 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#projects" className="apple-nav">
                プロジェクト
              </a>
              <button 
                onClick={() => setShowUrlShortener(true)}
                className="apple-nav"
              >
                URL短縮
              </button>
              <a 
                href="https://about.if.gy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="apple-nav"
              >
                プロフィール
              </a>
              <a 
                href="#contact"
                className="btn btn-primary hover-lift"
              >
                お問い合わせ
              </a>
            </motion.nav>
            
            <button className="md:hidden text-apple-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero セクション - Apple風のミニマルなデザイン */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" ref={heroRef}>
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div 
              style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
              className="mb-12 md:mb-16"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight md:leading-tight tracking-tight text-apple-gray-900 mb-6"
              >
                言語とテクノロジーの<br />
                <span className="text-gradient">新たな可能性</span>を創造
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-lg md:text-xl text-apple-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                if.gyは、最先端のテクノロジーと言語学の融合を通じて、コミュニケーションの未来を切り拓きます。
                シンプルで直感的なツールを提供し、言語の壁を超えた繋がりを実現します。
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button 
                  onClick={() => setShowUrlShortener(true)}
                  className="btn btn-primary hover-lift w-full sm:w-auto"
                >
                  URL短縮を試す
                </button>
                <a href="#projects" className="btn btn-secondary hover-lift w-full sm:w-auto">
                  プロジェクトを見る
                </a>
              </motion.div>
            </motion.div>
            
            {/* スクロールインジケーター */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-apple-gray-400">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14m-5-5l5 5 5-5" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 特徴セクション */}
      <section className="section py-20 md:py-32 bg-apple-gray-50">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-gray-900 mb-5">
                シンプルかつパワフルな<span className="text-gradient">機能</span>
              </h2>
              <p className="text-apple-gray-600 max-w-3xl mx-auto leading-relaxed">
                テクノロジーは複雑である必要はありません。if.gyは直感的で使いやすいツールを提供し、日常のタスクをスマートに解決します。
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-apple-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bgColor}`}>
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">{feature.title}</h3>
                <p className="text-apple-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* URLショートナーとプロジェクトセクション */}
      <section id="projects" className="section py-20 md:py-32">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-gray-900 mb-5">
                注目のプロジェクト
              </h2>
              <p className="text-apple-gray-600 max-w-3xl mx-auto leading-relaxed">
                言語とテクノロジーを融合させる革新的なプロジェクトで、未来のコミュニケーションを形作ります。
              </p>
            </motion.div>
          </div>
          
          <Projects />
        </div>
      </section>
      
      {/* お問い合わせセクション */}
      <section id="contact" className="section py-20 md:py-32 bg-apple-gray-50">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-gray-900 mb-5">
                お問い合わせ
              </h2>
              <p className="text-apple-gray-600 leading-relaxed">
                ご質問、ご提案、お問い合わせがありましたら、お気軽にご連絡ください。
              </p>
            </motion.div>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-apple-gray-100"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-apple-gray-700 mb-2">お名前</label>
                <input type="text" id="name" className="w-full" placeholder="山田 太郎" />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 mb-2">メールアドレス</label>
                <input type="email" id="email" className="w-full" placeholder="example@if.gy" />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-apple-gray-700 mb-2">メッセージ</label>
                <textarea id="message" rows={5} className="w-full" placeholder="お問い合わせ内容を入力してください"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary hover-lift w-full">送信する</button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* URL短縮機能モーダル */}
      <AnimatePresence>
        {showUrlShortener && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-apple-gray-900">URL短縮</h3>
                <button 
                  onClick={() => setShowUrlShortener(false)}
                  className="text-apple-gray-500 hover:text-apple-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <UrlShortener />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 特徴データ
const features = [
  {
    icon: "⚡",
    title: "超高速URL短縮",
    description: "わずか数秒でURLを短縮し、共有しやすい形式に変換。長いURLもシンプルかつ美しく。",
    bgColor: "bg-gradient-cool"
  },
  {
    icon: "🔍",
    title: "詳細な分析機能",
    description: "クリック数、地域、デバイスなど、URLごとの詳細な分析データを提供し、パフォーマンスを把握。",
    bgColor: "bg-gradient-primary"
  },
  {
    icon: "🛡️",
    title: "安全なリンク保護",
    description: "強固なセキュリティ対策により、フィッシングやマルウェアからユーザーを保護します。",
    bgColor: "bg-gradient-warm"
  }
];