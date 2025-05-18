// URL_Entry型定義
export interface URL_Entry {
  id: string;
  original_url: string;
  created_at: string;
  visits: number;
}

// APIレスポンス型
export interface URLsResponse {
  urls: URL_Entry[];
  error?: string;
} 