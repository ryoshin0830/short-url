'use client';

import { useState, FormEvent } from 'react';
import { VerifyPasskeyResponse } from '@/types';

interface PasskeyFormProps {
  onAuthenticated: (token: string) => void;
}

export default function PasskeyForm({ onAuthenticated }: PasskeyFormProps) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-passkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passkey }),
      });

      const data = await response.json() as VerifyPasskeyResponse;

      if (!response.ok) {
        setError(data.error || '認証に失敗しました');
        return;
      }

      if (data.success && data.token) {
        // 認証成功時の処理
        onAuthenticated(data.token);
      } else {
        setError('認証に失敗しました');
      }
    } catch (err) {
      setError('認証処理中にエラーが発生しました');
      console.error('認証エラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        データベースアクセス
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="passkey" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            パスキー
          </label>
          <input
            type="password"
            id="passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="パスキーを入力してください"
            required
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
            isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? '認証中...' : '認証する'}
        </button>
      </form>
    </div>
  );
} 