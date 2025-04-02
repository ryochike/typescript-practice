# TypeScript基礎学習リポジトリ

## 概要

このリポジトリはTypeScriptの基礎を学ぶための課題を提供します。段階的な課題を通して、TypeScriptの型システムや文法を実践的に学ぶことができます。

各セクションは[サバイバルTypeScript](https://typescriptbook.jp/)の対応する章を読んだ後に取り組むことを想定しています。理論と実践を組み合わせることで、TypeScriptの理解を深めることができます。

## セットアップ方法

### 前提条件

- [mise](https://mise.jdx.dev/)がインストールされていること
  - miseは複数のツールバージョンを統合管理するツールです

### 環境構築手順

1. **miseのインストール** (まだインストールしていない場合)

```bash
# macOSの場合
brew install mise

# その他のプラットフォームはmiseの公式ドキュメントを参照してください
# https://mise.jdx.dev/getting-started.html
```

2. **リポジトリのクローンとセットアップ**

```bash
# リポジトリをクローン
git clone https://github.com/{ユーザー名}/typescript-practice.git

# ディレクトリに移動
cd typescript-practice

# miseが.mise.tomlの設定に基づいて必要なNode.jsバージョンを自動的にインストール
mise install

# シェル環境をアクティベート（mise管理のツールを直接実行できるようにする）
mise activate

# 依存関係をインストール
npm install
```

> **Note:** `mise activate` コマンドを実行すると、現在のシェルでmise管理のNode.jsとnpmが直接利用できるようになります。新しいシェルを開いた場合は再度実行するか、`~/.bashrc`や`~/.zshrc`に`eval "$(mise activate)"`を追加すると便利です。

## リポジトリの構造

```txt
.
├── src/               # 課題のソースコード（ここを編集して課題に取り組みます）
│   ├── 1-overview/    # TypeScriptの概要
│   ├── 2-values-types-variables/ # 値・型・変数
│   ├── 3-statements/  # 文（制御構文）
│   ├── 4-functions/   # 関数
│   ├── 5-promise-async-await/ # 非同期処理
│   ├── 6-import-export-require/ # モジュールシステム
│   └── 7-generics/    # ジェネリクス
├── dist/              # トランスパイル後のJavaScriptファイル（自動生成）
├── tsconfig.json      # TypeScript設定ファイル
├── package.json       # プロジェクト設定と依存関係
└── .mise.toml         # mise設定ファイル（Node.jsバージョン管理）
```

## 学習内容と進め方

各セクションは、サバイバルTypeScriptの対応する章を読んだ後に取り組むことを想定しています。以下の順番で学習を進めることをお勧めします：

### 1. TypeScriptのあらまし

**対応する学習資料**: [TypeScriptのあらまし | サバイバルTypeScript](https://typescriptbook.jp/overview)

TypeScriptの基本的な使い方、トランスパイル（コンパイル）の流れ、静的型チェックの仕組みを学びます。この章を読んだ後、「1-overview」フォルダの課題に取り組むことで、基本的な概念と操作方法を身につけます。

### 2. 値・型・変数

**対応する学習資料**: [値・型・変数 | サバイバルTypeScript](https://typescriptbook.jp/reference/values-types-variables)

基本的な型（number, string, boolean）からオブジェクト型、配列型まで、TypeScriptの型システムの基礎を学びます。この章を読んだ後、「2-values-types-variables」フォルダの課題に取り組むことで、型システムの理解を深めます。

### 3. 文（制御構文）

**対応する学習資料**: [文 | サバイバルTypeScript](https://typescriptbook.jp/reference/statements)

条件分岐（if, switch）や繰り返し処理に加え、TypeScript特有の型ナロイング（型の絞り込み）について学びます。この章を読んだ後、「3-statements」フォルダの課題に取り組むことで、制御構文と型の絞り込みのテクニックを習得します。

### 4. 関数

**対応する学習資料**: [関数 | サバイバルTypeScript](https://typescriptbook.jp/reference/functions)

関数の型定義、オプション引数、デフォルト値の設定方法を学び、純粋関数の概念も理解します。この章を読んだ後、「4-functions」フォルダの課題に取り組むことで、関数の型付けの技術を身につけます。

### 5. Promise / async / await

**対応する学習資料**: [Promise / async / await | サバイバルTypeScript](https://typescriptbook.jp/reference/promise-async-await)

非同期処理の基本パターン、Promiseチェーン、async/await構文を使った効率的な非同期プログラミングを学びます。この章を読んだ後、「5-promise-async-await」フォルダの課題に取り組むことで、非同期プログラミングのパターンを習得します。

### 6. import / export / require

**対応する学習資料**: [import、export、require | サバイバルTypeScript](https://typescriptbook.jp/reference/import-export-require)

モジュール分割の方法と、ES ModulesとCommonJSの両方のモジュールシステムの違いを理解します。この章を読んだ後、「6-import-export-require」フォルダの課題に取り組むことで、モジュール化とコード分割のテクニックを身につけます。

### 7. ジェネリクス

**対応する学習資料**: [ジェネリクス (generics) | サバイバルTypeScript](https://typescriptbook.jp/reference/generics)

型パラメータを使った汎用的なコードの書き方、型安全なプログラミングの方法を学びます。この章を読んだ後、「7-generics」フォルダの課題に取り組むことで、再利用可能な型安全なコンポーネントの作成方法を習得します。

## 課題の進め方

1. 各セクションに対応するサバイバルTypeScriptの章を読みます
2. 対応するフォルダにある `.md` ファイルを読み、課題内容を理解します
3. `.ts` ファイルを開き、TODOコメントや指示に従ってコードを実装します
4. トランスパイルしてコードを実行し、動作を確認します

```bash
# プロジェクト全体をトランスパイル
npm run build

# 実行例
node dist/1-overview/hello.js
```

5. テストを実行して、課題が正しく実装されているか確認します

```bash
# 特定の課題のテストを実行
npm run test -- src/1-overview/hello.test.ts
```

## よくある質問

### Q: 新しいシェルを開くたびに`mise activate`を実行する必要がありますか？

A: はい。永続的に設定したい場合は、`.bashrc`や`.zshrc`などのシェル設定ファイルに`eval "$(mise activate)"`を追加しておくと便利です。

### Q: miseで適切なNode.jsバージョンが見つからないというエラーが出る場合は？

A: `.mise.toml`ファイルを確認し、`mise install`コマンドを実行して必要なバージョンをインストールしてください。

### Q: コンパイルエラーが発生する場合はどうすればいいですか？

A: エラーメッセージをよく読み、どのような型エラーが起きているかを理解しましょう。TypeScriptの型エラーは詳細なメッセージを提供しています。

### Q: テストが失敗する場合はどうすればいいですか？

A: テストコードを読んで、何を期待しているか理解し、自分の実装と比較してみましょう。

### Q: エディタで型補完が効かない場合は？

A: VSCodeなどのエディタでTypeScriptの拡張機能がインストールされているか確認してください。

## リソース

- [TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive)
- [mise公式ドキュメント](https://mise.jdx.dev/)
