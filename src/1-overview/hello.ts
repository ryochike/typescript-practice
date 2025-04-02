// TypeScriptの基本的な使い方を学習するファイル

/**
 * 課題1: 変数宣言と文字列出力
 *
 * 以下の手順で実装してください：
 * 1. userName という変数を宣言し、あなたの名前を代入してください
 * 2. console.log を使って「Hello, あなたの名前!」と出力してください
 */

// ここにuserName変数の宣言とconsole.logを実装

/**
 * 課題2: 型システムの基本
 *
 * 以下の変数に適切な型アノテーションを追加してください：
 * 1. userAge: 数値型 (25を代入)
 * 2. isActive: 真偽値型 (trueを代入)
 * 3. greeting: 文字列型 (「こんにちは、[userName]さん。あなたは[userAge]歳です。」)
 *
 * 型アノテーションの例: const 変数名: 型 = 値;
 */

// ここに型アノテーション付きの変数宣言を実装

/**
 * 課題3: 型エラーの確認
 *
 * 以下のコードをコメント解除して、TypeScriptの型チェックがどのように
 * 動作するか確認してみてください。エラーメッセージを読み、なぜエラーが
 * 発生するのか理解しましょう。
 *
 * TypeScriptがトランスパイル時に型の不一致を検出する仕組みを体験します。
 * コードをトランスパイルするには以下のコマンドを実行します:
 * npx tsc src/1-overview/hello.ts
 */

// userName = 123; // 文字列型の変数に数値を代入
// userAge = "25"; // 数値型の変数に文字列を代入

/**
 * 課題4: 結果の出力
 *
 * greeting変数の内容をコンソールに出力してください。
 * console.log()を使用して、変数の内容を表示します。
 */

// ここにconsole.logを実装

/**
 * 補足: TypeScriptの基本
 *
 * TypeScriptはJavaScriptに静的型付けを追加した言語です。
 * 高水準言語→高水準言語への変換を行うため、これを「トランスパイル」と呼びます。
 *
 * トランスパイルの流れ:
 * TypeScript(.ts) → トランスパイラ(tsc) → JavaScript(.js) → 実行(Node.js)
 */
