// components/UrlShortener.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';
import UrlList, { URL_Entry } from '@/components/UrlList';

// 入力検証用の正規表現
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [customAlias, setCustomAlias] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [copiedUrl, setCopiedUrl] = useState('');
  const [savedUrls, setSavedUrls] = useState<URL_Entry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // ユーザーの保存済みURLを取得
  const fetchSavedUrls = async () => {
    try {
      const response = await fetch('/api/urls');
      const data = await response.json();
      if (response.ok) {
        setSavedUrls(data.urls);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  useEffect(() => {
    fetchSavedUrls();
  }, []);

  // URL短縮処理
  const shortenUrl = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    // 入力検証
    if (!longUrl) {
      setMessage({ type: 'error', content: 'URLを入力してください。' });
      return;
    }

    if (!URL_REGEX.test(longUrl)) {
      setMessage({ type: 'error', content: '有効なURLを入力してください。' });
      return;
    }

    // カスタムエイリアスの検証
    let shortCode = alias;
    if (customAlias && !alias) {
      setMessage({ type: 'error', content: 'カスタムエイリアスを入力してください。' });
      return;
    }

    // カスタムエイリアスが指定されていない場合は自動生成
    if (!customAlias) {
      shortCode = nanoid(6); // 6文字のランダムID
    }

    setIsLoading(true);

    try {
      // APIにリクエスト送信
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl: longUrl.startsWith('http') ? longUrl : `https://${longUrl}`,
          shortCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 成功メッセージを表示
        setMessage({ type: 'success', content: 'URLが正常に短縮されました！' });
        setShowSuccess(true);
        // 短縮URLをコピー
        const shortUrl = `${window.location.origin}/${data.shortCode}`;
        navigator.clipboard.writeText(shortUrl)
          .then(() => {
            setCopiedUrl(shortUrl);
          })
          .catch(err => {
            console.error('クリップボードへのコピーに失敗しました:', err);
          });
        
        // フォームをリセット
        setLongUrl('');
        setAlias('');
        setCustomAlias(false);
        
        // 保存済みURLを再取得
        fetchSavedUrls();
      } else {
        // エラーメッセージを表示
        setMessage({ type: 'error', content: data.message || 'エラーが発生しました。もう一度お試しください。' });
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setMessage({ type: 'error', content: 'エラーが発生しました。もう一度お試しください。' });
    } finally {
      setIsLoading(false);
    }
  };

  // 成功メッセージを閉じる
  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-6 p-4 rounded-xl bg-success bg-opacity-10 text-success relative"
          >
            <button
              onClick={closeSuccess}
              className="absolute top-3 right-3 text-success"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex items-start space-x-3">
              <span className="text-success text-lg">✓</span>
              <div>
                <h4 className="font-medium text-success mb-1">URL短縮に成功しました</h4>
                <p className="text-sm text-success text-opacity-90">短縮URLをクリップボードにコピーしました。</p>
                {copiedUrl && (
                  <div className="mt-3 p-3 rounded-lg bg-white border border-success border-opacity-20 flex justify-between items-center">
                    <span className="font-medium text-sm">{copiedUrl}</span>
                    <span className="text-xs text-success">コピー済み</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={shortenUrl} className="space-y-6">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-apple-gray-700 mb-2">
            短縮したいURL
          </label>
          <input
            type="text"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/that/you/want/to/shorten"
            className="w-full"
            autoComplete="off"
          />
        </div>

        <div className="flex items-center space-x-2 py-2">
          <div 
            className={`apple-toggle ${customAlias ? 'active' : ''}`} 
            onClick={() => setCustomAlias(!customAlias)}
          />
          <label
            htmlFor="customAlias"
            className="text-sm font-medium text-apple-gray-700 cursor-pointer"
          >
            カスタムリンクを使用
          </label>
        </div>

        {customAlias && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <label htmlFor="alias" className="block text-sm font-medium text-apple-gray-700 mb-2">
              カスタムエイリアス（短縮後のURL）
            </label>
            <div className="flex items-center">
              <span className="text-apple-gray-500 bg-apple-gray-100 px-3 py-2 rounded-l-md border border-apple-gray-200 border-r-0">
                {window.location.origin}/
              </span>
              <input
                type="text"
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="your-custom-link"
                className="flex-1 rounded-none rounded-r-md"
                autoComplete="off"
              />
            </div>
            <p className="mt-1 text-xs text-apple-gray-500">
              アルファベット、数字、ハイフン、アンダースコアが使用できます。
            </p>
          </motion.div>
        )}

        {message.content && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-error bg-opacity-10 text-error' : 'bg-success bg-opacity-10 text-success'}`}>
            {message.content}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary hover-lift w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              処理中...
            </div>
          ) : 'URLを短縮'}
        </button>
      </form>

      {savedUrls.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-6">あなたの短縮URL</h3>
          <UrlList urls={savedUrls} onUpdate={fetchSavedUrls} />
        </div>
      )}
    </div>
  );
}