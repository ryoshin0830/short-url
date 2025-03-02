// components/UrlShortener.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ApiResponse } from '@/types';

export default function UrlShortener() {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json() as ApiResponse;
      
      if (!response.ok) {
        throw new Error(data.error || 'URL短縮中にエラーが発生しました');
      }
      
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('URL短縮中にエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        alert('コピーしました！');
      })
      .catch(() => {
        alert('コピーに失敗しました。手動でコピーしてください。');
      });
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {isLoading ? '処理中...' : 'URLを短縮する'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {shortUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">短縮URL:</p>
          <div className="flex items-center">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none"
            />
            <button
              onClick={handleCopyClick}
              className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 focus:outline-none"
            >
              コピー
            </button>
          </div>
        </div>
      )}
    </div>
  );
}