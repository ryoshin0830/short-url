// types/index.ts

export interface ShortenedUrl {
    id: number;
    original_url: string;
    created_at: Date;
    visits: number;
  }
  
  export interface ApiResponse {
    shortUrl?: string;
    error?: string;
  }

  export interface VerifyPasskeyResponse {
    success?: boolean;
    token?: string;
    error?: string;
  }

  export interface UrlsResponse {
    urls?: ShortenedUrl[];
    error?: string;
  }

  export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
  }