'use client';

import { useEffect, useState } from 'react';

// URL_Entry型の定義
export interface URL_Entry {
  id: string;
  shortCode: string;
  longUrl: string;
  createdAt: string;
  clickCount: number;
}

interface UrlListProps {
  token?: string;
  urls?: URL_Entry[];
  onCopy?: (url: string) => void;
  copiedUrl?: string;
  onRefresh?: () => Promise<void>;
  onUpdate?: () => Promise<void>;
}

export default function UrlList({ token, urls: propUrls, onCopy, copiedUrl, onRefresh, onUpdate }: UrlListProps) {
  const [urls, setUrls] = useState<URL_Entry[]>([]);
  const [isLoading, setIsLoading] = useState(token !== undefined);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  useEffect(() => {
    if (propUrls) {
      setUrls(propUrls);
      setIsLoading(false);
    }
  }, [propUrls]);

  useEffect(() => {
    if (!token) return;
    
    const fetchUrls = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/urls', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'URLの取得に失敗しました');
          return;
        }

        if (data.urls) {
          setUrls(data.urls);
        } else {
          setUrls([]);
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
        setError('URLの取得中にエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, [token]);

  const handleCopy = (url: string, id: string) => {
    if (onCopy) {
      onCopy(url);
    } else {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopiedUrlId(id);
          setTimeout(() => setCopiedUrlId(null), 2000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('この短縮URLを削除しますか？この操作は元に戻せません。');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/urls/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 削除成功時はリストから削除
        setUrls(urls.filter(url => url.id !== id));
        // 親コンポーネントの更新関数があれば呼び出す
        if (onUpdate) {
          await onUpdate();
        } else if (onRefresh) {
          await onRefresh();
        }
      } else {
        const data = await response.json();
        alert(data.error || 'URLの削除に失敗しました');
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      alert('URLの削除中にエラーが発生しました');
    }
  };

  // ローディング状態の表示
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-apple-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <div className="p-4 rounded-lg bg-error bg-opacity-10 text-error text-sm">
        {error}
      </div>
    );
  }

  // URLがない場合の表示
  if (urls.length === 0) {
    return (
      <div className="text-center py-8 text-apple-gray-500">
        短縮されたURLはまだありません。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {urls.map((url) => {
        const shortUrl = `${window.location.origin}/${url.shortCode}`;
        const isCopied = copiedUrlId === url.id || (copiedUrl && copiedUrl === shortUrl);
        
        return (
          <div key={url.id} className="p-4 bg-white rounded-xl border border-apple-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-primary truncate mb-1">
                  {shortUrl}
                </p>
                <p className="text-xs text-apple-gray-500 truncate mb-2">
                  {url.longUrl}
                </p>
                <div className="flex items-center text-xs text-apple-gray-500">
                  <span className="mr-4">
                    <span className="font-medium">{url.clickCount}</span> クリック
                  </span>
                  <span>
                    {new Date(url.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(shortUrl, url.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isCopied 
                      ? 'bg-success bg-opacity-10 text-success' 
                      : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                  }`}
                >
                  {isCopied ? 'コピー済み' : 'コピー'}
                </button>
                
                <button
                  onClick={() => handleDelete(url.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200 transition-colors"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 