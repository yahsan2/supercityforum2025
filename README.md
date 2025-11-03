# スーパーシティ・フォーラム 2026

## 概要
スーパーシティ・フォーラム2026のWebサイトプロジェクトです。

## 技術スタック
- Vite
- Handlebars (テンプレートエンジン)
- HTML/CSS/JavaScript

## セットアップ

### 必要な環境
- Node.js (v16以上)
- npm

### インストール
```bash
npm install
```

## 開発

### 開発サーバーの起動
```bash
npm run dev
```
開発サーバーはhttp://localhost:3000で起動します。

### ビルド
```bash
npm run build
```
ビルドされたファイルは`dist`ディレクトリに出力されます。

### プレビュー
```bash
npm run preview
```

### ビルド後のプレビュー（本番環境のパス）
```bash
npm run preview:build
```

### ビルドと圧縮ファイル生成
```bash
npm run generate
```

## プロジェクト構成

```
supercityforum2026/
├── dist/               # ビルド出力ディレクトリ
├── images/             # 画像ファイル
├── js/                 # JavaScriptファイル
├── scripts/            # ビルドスクリプト
├── src/                # ソースファイル
├── *.html              # 各ページのHTMLファイル
├── style.css           # スタイルシート
├── package.json        # プロジェクト設定
├── vite.config.js      # Vite設定
└── README.md           # このファイル
```

## ページ構成
- index.html - トップページ
- program.html - プログラム
- networking.html - 参加者同士の交流
- registration.html - 申込情報
- access.html - アクセス

## デプロイ
本番環境へのデプロイは`/tiiki/toc/event/supercityforum2025/`パスに配置されます。

## 開発者向け情報

### コードフォーマット
BiomeJSを使用してコードフォーマットを行っています。

### 環境変数
`.env.local`ファイルで環境変数を設定できます。

## ライセンス
ISC