---
title: "人生も URL も短い方がいい！Modern な URL 短縮サービス「if.gy」を作ってみた"
emoji: "🔗"
type: "tech"
topics: ["nextjs", "typescript", "vercel", "postgres", "urlshortener"]
published: true
---

# 長いURLなんて、誰が困る？ 😫

皆さん、こんにちは！**長すぎるURL**に悩まされたことはありませんか？

「え？そんなの気にしたこともない？」

...そう言って、こちらを見てみてください。これが私が先日友達に送ろうとしたURLです👇

```
https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%82%92%E5%A7%8B%E3%82%81%E3%81%9F%E4%BA%BA%E3%81%8C%E6%9C%80%E5%88%9D%E3%81%AB%E3%81%99%E3%81%B9%E3%81%8D10%E3%81%AE%E7%BF%92%E6%85%A3%E3%81%A8%E5%BF%85%E8%A6%81%E3%81%AA%E3%83%9E%E3%82%A4%E3%83%B3%E3%83%89%E3%82%BB%E3%83%83%E3%83%88-%E9%95%B7%E6%99%82%E9%96%93%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E7%B6%9A%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E7%A7%98%E8%A8%A3/dp/4798177458
```

...どうですか？このURLをLINEで送ろうとしたとき、メッセージが「ほぼURL」状態になってしまいました。そして友達からは「なにこれ怪しい」と返信が...。

# URL短縮サービスの救世主！だけど... 🤔

「URL短縮サービスを使えばいいじゃん！」と思った方、その通りです！でもここで問題が。

- 「bit.ly」「TinyURL」とか有名どころはあるけど、UIが古い...
- 広告が多すぎる...
- 「こんなサービス、すぐ消えそう...」という不安感

というわけで、**自分で最高のURL短縮サービスを作ることにしました**！

# 「if.gy」の誕生！🎉

**「if.gy」** - 名前の由来は「**if**」（条件分岐）と「**.gy**」（ドメイン）の組み合わせです。プログラマーなら「if」に反応しますよね？（...しませんか？）

「ドメインはどうやって選んだの？」って？...安かったからです。正直に言います。

## 技術スタックは超モダン 🚀

このプロジェクトは**未来からやってきた**かのような最新技術だけで構成しています：

- **Next.js 15** - Reactの最新版を内蔵
- **Vercel Postgres (Neon)** - サーバーレスなのに高速なSQL
- **TailwindCSS 4** - CSSを書かなくても良い魔法
- **TypeScript** - 型がないとコーディングできない体になってしまった方向け

## 実装のポイント 💡

### 短縮の仕組み

「URLを短くする」ということは、つまり「長いモノを短いモノに置き換える」ということ。

```typescript
// 短縮アルゴリズム (超簡略版)
export async function createShortUrl(originalUrl: string): Promise<number> {
  // 長いURLをデータベースに保存して、数字のIDを取得
  const result = await sql<{ id: number }>`
    INSERT INTO shortened_urls (original_url)
    VALUES (${originalUrl})
    RETURNING id;
  `;
  return result.rows[0].id; // この数字がショートコードの基になる
}
```

これだけです！シンプルでしょう？データベースに保存したらIDが返ってくるので、そのIDをURLの末尾に使います。「https://if.gy/123」みたいな感じです。

なぜもっと複雑なアルゴリズムを使わないのか？簡単です：**KISSの原則**（Keep It Simple, Stupid）を大事にしているからです。プログラミングは複雑にすればいいというものではありません...（ツッコミ待ち）

### アクセス統計の記録

URLが短くなるだけじゃなく、何回アクセスされたかも記録します：

```typescript
export async function getOriginalUrl(id: number): Promise<string | null> {
  // URLにアクセスがあったらカウンターを増やす
  const result = await sql<{ original_url: string }>`
    UPDATE shortened_urls
    SET visits = visits + 1
    WHERE id = ${id}
    RETURNING original_url;
  `;
  
  return result.rows[0]?.original_url || null;
}
```

ショートURLが開かれるたびに、データベースのvisitsカウンターが+1されます。「この記事へのリンク、全然クリックされてないな...」という悲しい現実も確認できちゃいます（そんな機能いらない）。

### モダンなUI/UX

このプロジェクトで一番こだわったのはUI/UXです。「URL短縮サービスなんて機能性だけじゃないの？」と思うかもしれませんが、それは間違い。**見た目も大事です**。

```tsx
<motion.button
  type="submit"
  disabled={isLoading}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium text-base hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
>
  {isLoading ? '処理中...' : '短縮URLを生成する'}
</motion.button>
```

見てください！このコードの美しさを！`whileHover`や`whileTap`は、ボタンがホバーされたりクリックされたときに小さなアニメーションを追加します。こういう小さな工夫が、ユーザー体験を格上げするんです。

### API対応

「でもURLを短縮するたびにWebサイトを開くのは面倒くさい...」というプログラマーの方のために、APIも提供しています：

```bash
curl -X POST https://if.gy/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/long/url"}'
```

レスポンスはこんな感じ：

```json
{
  "shortUrl": "https://if.gy/42"
}
```

もうSlack botやLINE botから直接URL短縮ができますね！（実装は読者の皆様におまかせします...）

# わかった、使ってみたい！どうすればいい？ 🤩

「if.gy」はすでに公開しています！ブラウザで [https://if.gy](https://if.gy) にアクセスしてください。

...えっ？「ドメインが見つかりません」って出る？そりゃそうです。この記事はプロジェクトについて書いたもので、実際にサービスを公開しているわけではありません（笑）。

もし本当に試してみたい方は、GitHub からコードをクローンして自分でデプロイしてみてください：

```bash
git clone https://github.com/ryoshin0830/if-gy.git
cd if-gy
npm install
npm run dev
```

# おわりに：URLも人生も短く、シンプルに 🧘‍♂️

長いURLを短くするという単純なアイデアから始まったプロジェクトですが、実装してみると意外と学びがありました：

1. **シンプルな解決策が最善** - 複雑なアルゴリズムより、単純なDB操作で解決できることも多い
2. **UXは機能と同じくらい重要** - 同じ機能でも、使いやすさで大きく差がつく
3. **副産物を活かす** - URLの統計情報という副産物が、新たな価値を生み出すことも

最後に哲学的な問いかけを：「私たちの人生もURLのように短縮できたら、どんな風になるでしょう？」不要な部分を省いて、本当に伝えたいことだけに集中する...。

そんなことを考えながら、今日も私はコードを書き続けます。

それでは、短くて濃い人生を！👋 