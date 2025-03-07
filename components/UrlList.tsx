'use client';

import { useEffect, useState } from 'react';
import { ShortenedUrl, UrlsResponse } from '@/types';

interface UrlListProps {
  token: string;
}

export default function UrlList({ token }: UrlListProps) {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/urls', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json() as UrlsResponse;

        if (!response.ok) {
          setError(data.error || 'URLの取得に失敗しました');
          return;
        }

        if (data.urls) {
          setUrls(data.urls);
        } else {
          setUrls([]);
        }
      } catch (err) {
        setError('URLの取得中にエラーが発生しました');
        console.error('取得エラー:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-md">
        {error}
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
        <p className="text-center text-gray-600 dark:text-gray-400">
          短縮URLがありません
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          短縮URL一覧
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          合計: {urls.length}件
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                元URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                作成日時
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                訪問回数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                短縮URL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {urls.map((url) => (
              <tr key={url.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {url.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                  <a 
                    href={url.original_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                  >
                    {url.original_url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {new Date(url.created_at).toLocaleString('ja-JP')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {url.visits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a 
                    href={`https://if.gy/${url.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                  >
                    https://if.gy/{url.id}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 