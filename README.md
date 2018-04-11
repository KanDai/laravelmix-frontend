# Laravelmix Frontend Template

[Laravel Mix](https://readouble.com/laravel/5.6/ja/mix.html)によるフロントエンドビルド環境です。

## できること

- SCSSビルド
- JavaScriptビルド(ES2015記法)
- SourceMap生成(開発ビルド時のみ)
- [Prettier](https://prettier.io/)によるコード整形
- [BrowserSync](https://browsersync.io/)を使ったローカルサーバー

### SCSSビルド

`resources/sass` 直下の `*.scss` ファイルがコンパイル対象になります。
`resources/sass/xxxx` のようなディレクトリ内のファイルは対象にならないので、インクルード用のファイルなどはディレクトリ内に配置してください。

#### 設定 / 機能
- スタイルシート中の `url()` を最適化する `processCssUrls` はOFF
- Sassのインポート機能でglob使用可能( `@import "variable/**"` みたいな書き方)
- [Autoprefixer](https://github.com/postcss/autoprefixer)によるベンダープレフィックス付与
- [CSS MQPacker](https://github.com/hail2u/node-css-mqpacker)によるメディアクエリーの最適化
- [CSS Declaration Sorter](https://github.com/Siilwyn/css-declaration-sorter)によるプロパティをソート

### JavaScriptビルド(ES2015記法)

`resources/js` 直下の `*.js` ファイルがコンパイル対象になります。
`resources/js/xxxx` のようなディレクトリ内のファイルは対象にならないので、インクルード用のファイルなどはディレクトリ内に配置してください。Laravel Mixの機能で、`.vue` ファイルのコンパイルもしてくれます。

JSのライブラリは `npm install` すると `vue` / `axios` / `jquery` / `lodash` がインストールされるようになってます。

### SourceMap生成(開発ビルド時のみ)

開発時のみ、生成されたCSSとJavaScriptににSourceMapを書き出します。
ファイル生成ではなく、inline sourcemapです。

### Prettierによるコード整形

`.js` ファイルと `.scss` ファイルはPrettierによるコード整形が入ります。
watchしていれば、保存時に整形してくれます。
`.js` ファイルだけ、シングルクォートにするのと行末のセミコロンを取る設定にしてます。
`webpack.mix.js` の58-61行で設定してます。

### BrowserSyncを使ったローカルサーバー

`npm start` か `npm run watch` を叩くとBrowserSyncによるローカルサーバーが立ち上がります。
デフォルトは `public` ディレクトリをルートにしたローカルサーバーがポート `8080` で立ち上がります。

Proxyを使う場合は、`webpack.mix.js` の41-46行目をコメントアウトして39行目のコメントアウトを解除してください。Proxy URLの設定は、環境設定用の `.env` ファイルが使えるようになっています。

ルートディレクトリの環境設定用ファイル `.env.example` をコピーして `.env` にリネームして、ローカル開発環境用のURLを記述してください。

```
MIX_SENTRY_DSN_PUBLIC=Local Development URL
```

## フォルダ構造

```
├── public
│   ├── assets/css    CSS (ビルド出力先)
│   └── assets/js     JS (ビルド出力先)
└── resources         ソースコード (JS/CSS)
    ├── js
    │   ├── xxx.js    エントリポイント（直下のjs）
    │   └── xxx       インクルード用のjs/.vueファイル格納先
    └── sass
        ├── xxx.scss  エントリポイント（直下のscss）
        └── xxx       インクルード用のscssファイル格納先
```

## 使い方

### インストール

ルートディレクトリで `npm install` を実行してモジュールをインストールしてください。

### 実行方法

- `npm start` : 開発用ビルドとBrowserSyncによるwatch
- `npm run dev` : 開発用ビルドのみ実行
- `npm run build` : プロダクション用のビルドのみ実行
