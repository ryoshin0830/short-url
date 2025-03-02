# if-gy - URL短縮サービス

このプロジェクトは、長いURLを短いURLに変換するシンプルなURL短縮サービスです。Next.js 15とVercel PostgreSQLデータベースを活用し、モダンなUI/UXを提供します。

## 技術スタック

- **フロントエンド**: [Next.js 15](https://nextjs.org/)、React 19、TailwindCSS 4
- **バックエンド**: Next.js APIルート、Vercel Serverless Functions
- **データベース**: [Vercel PostgreSQL (Neon)](https://vercel.com/docs/storage/vercel-postgres)
- **デプロイ**: [Vercel](https://vercel.com/)
- **バージョン管理**: Git、GitHub

## 機能

- 長いURLを短いリンクに変換
- 短縮URLを通じたリダイレクト
- アクセス統計の記録（訪問回数）
- モダンで使いやすいユーザーインターフェース
- レスポンシブデザイン
- 外部アプリケーションから利用可能なREST API

## ローカル開発環境のセットアップ

### 前提条件

- Node.js 18以上
- npm (Node.jsに付属)
- Git

### インストール手順

1. リポジトリをクローン:
```bash
git clone https://github.com/ryoshin0830/if-gy.git
cd if-gy
```

2. 依存パッケージをインストール:
```bash
npm install
```

3. `.env.local`ファイルを作成し、必要な環境変数を設定:
```
# 主要なデータベース接続URL
DATABASE_URL=postgres://<USERNAME>:<PASSWORD>@<HOST>/neondb?sslmode=require

# pgbouncer無しの接続用
DATABASE_URL_UNPOOLED=postgresql://<USERNAME>:<PASSWORD>@<HOST>/neondb?sslmode=require

# 接続文字列構築用パラメータ
PGHOST=<HOST>
PGHOST_UNPOOLED=<HOST_UNPOOLED>
PGUSER=<USERNAME>
PGDATABASE=<DATABASE_NAME>
PGPASSWORD=<PASSWORD>

# Vercel Postgresテンプレート用パラメータ
POSTGRES_URL=postgres://<USERNAME>:<PASSWORD>@<HOST>/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgres://<USERNAME>:<PASSWORD>@<HOST>/neondb?sslmode=require
POSTGRES_USER=<USERNAME>
POSTGRES_HOST=<HOST>
POSTGRES_PASSWORD=<PASSWORD>
POSTGRES_DATABASE=<DATABASE_NAME>
POSTGRES_URL_NO_SSL=postgres://<USERNAME>:<PASSWORD>@<HOST>/neondb
POSTGRES_PRISMA_URL=postgres://<USERNAME>:<PASSWORD>@<HOST>/neondb?connect_timeout=15&sslmode=require
```

4. 開発サーバーを起動:
```bash
npm run dev
```

5. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス

## データベース構造

プロジェクトは以下のテーブル構造を使用しています:

```sql
CREATE TABLE IF NOT EXISTS shortened_urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  visits INTEGER DEFAULT 0
);
```

## デプロイ方法

このプロジェクトはVercelとGitHubの連携を利用して簡単にデプロイできます。

### GitHubへのプッシュ

1. GitHubリポジトリの作成:
```bash
# GitHub CLIを使用する場合
gh repo create if-gy --public --source=. --remote=origin --push
```

2. 変更をプッシュ:
```bash
git add .
git commit -m "コミットメッセージ"
git push
```

### Vercelへのデプロイ

1. Vercel CLIのインストール (まだの場合):
```bash
npm install -g vercel
```

2. Vercelにログイン:
```bash
vercel login
```

3. プロジェクトをデプロイ:
```bash
vercel
```

4. 本番環境にデプロイ:
```bash
vercel --prod
```

### データベースの設定

1. Vercelダッシュボード (https://vercel.com/dashboard) にアクセス
2. プロジェクト「if-gy」を選択
3. 「Storage」タブを選択
4. 「Connect Database」→「PostgreSQL」→「Neon」を選択
5. 指示に従ってデータベースを作成
6. 作成後、データベース接続情報が自動的に環境変数に設定されます

### 環境変数の設定

1. Vercelダッシュボードのプロジェクト設定から「Environment Variables」を選択
2. 以下の環境変数を設定:
   - `DATABASE_URL` - PostgreSQLデータベースの接続URL
   - `POSTGRES_URL` - 同上
   - その他、データベース接続に必要な変数

## Next.js 15での型定義への対応

Next.js 15ではページコンポーネントの型定義が変更されています。対応するために、以下のように型エラーを回避しています:

```typescript
// @ts-expect-error - Next.js 15の型定義の変更に対応するため
export default async function RedirectPage({ params }) {
  // 関数本体
}
```

## 使用方法

1. トップページにアクセス
2. フォームに短縮したいURLを入力
3. 「短縮する」ボタンをクリック
4. 生成された短いURLをコピーして使用

## API仕様

if.gyではREST APIを提供しており、外部アプリケーションからURL短縮機能を利用することができます。

### エンドポイント

#### URLの短縮

```
POST /api/shorten
```

**リクエストボディ (JSON):**

```json
{
  "url": "https://example.com/very/long/url/that/needs/to/be/shortened"
}
```

**成功時のレスポンス (200 OK):**

```json
{
  "shortUrl": "https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app/123"
}
```

**エラー時のレスポンス (400 Bad Request):**

```json
{
  "error": "有効なURLを入力してください"
}
```

**エラー時のレスポンス (500 Internal Server Error):**

```json
{
  "error": "URL短縮中にエラーが発生しました"
}
```

### APIの使用例

#### cURLでの使用例

```bash
curl -X POST https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/long/url"}'
```

#### JavaScriptでの使用例

```javascript
async function shortenUrl(url) {
  try {
    const response = await fetch('https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'URL短縮に失敗しました');
    }
    
    return data.shortUrl;
  } catch (error) {
    console.error('エラー:', error);
    return null;
  }
}

// 使用例
shortenUrl('https://example.com/very/long/url')
  .then(shortUrl => {
    if (shortUrl) {
      console.log('短縮URL:', shortUrl);
    }
  });
```

#### Pythonでの使用例

```python
import requests

def shorten_url(url):
    try:
        response = requests.post(
            'https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app/api/shorten',
            json={'url': url}
        )
        response.raise_for_status()
        return response.json()['shortUrl']
    except requests.exceptions.RequestException as e:
        print(f"エラー: {e}")
        return None

# 使用例
short_url = shorten_url('https://example.com/very/long/url')
if short_url:
    print(f'短縮URL: {short_url}')
```

### 注意事項

- APIリクエストには必ず有効なURLを含めてください
- URLは `http://` または `https://` で始まる必要があります
- 当サービスの利用規約に違反するコンテンツへのリンクは禁止されています
- 過度な頻度でのAPIリクエストは制限される場合があります

## プロジェクト構造

```
if-gy/
├── app/                  # Next.js 15のAppディレクトリ
│   ├── [id]/             # 動的ルート（リダイレクト用）
│   ├── api/              # APIエンドポイント
│   │   └── shorten/      # URL短縮API
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # トップページ
├── components/           # Reactコンポーネント
├── lib/                  # ユーティリティ関数
│   └── db.ts             # データベース操作関数
├── public/               # 静的ファイル
├── types/                # TypeScript型定義
├── .env.local            # 環境変数（非コミット）
├── .gitignore            # Gitの無視ファイル設定
├── next.config.js        # Next.js設定
├── package.json          # プロジェクト依存関係
├── tsconfig.json         # TypeScript設定
└── vercel.json           # Vercel設定
```

## デモ

デプロイされたアプリケーションは以下のURLでアクセスできます:
- [https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app](https://if-mnxrm6no4-fyuneru0830s-projects.vercel.app)

## ライセンス

MIT

## 作者

Ryoshin
