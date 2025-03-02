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