# 4. 関数

このセクションでは、TypeScript の関数に関する概念と実装方法を学びます。特に以下のポイントを中心に扱います：

- **オプション引数** (`param?: type`)
- **デフォルト値** (`param = defaultValue`)
- 関数の設計と可読性、**純粋関数 (Pure Function)** の考え方

## 4-1. オプション引数とデフォルト値

### 概要

任意の引数を受け取る関数を定義し、文字列フォーマットを出力する課題を通じて、
TypeScript の **関数パラメータの柔軟性** と **シンプルで分かりやすい関数設計** について学習します。

> **純粋関数（Pure Function）とは？**  
> **純粋関数** とは、同じ引数を与えれば常に同じ結果を返し、外部に影響を与えない関数のことです。  
>
> - **メリット 1:** テストしやすい（依存する外部状態がないためテストケースが明確）  
> - **メリット 2:** リファクタリングや再利用がしやすい（外からの影響を受けにくい）  

### 目的・ゴール

- TypeScript 関数のパラメータに型アノテーションを付ける方法を理解する
- オプション引数（`param?: type`）の使い方と動作を学ぶ
- デフォルト値（`param = defaultValue`）の設定方法と利点を理解する
- オプション引数とデフォルト値の違いを比較分析する
- **なぜ副作用が少ない "純粋関数" が保守性に優れるのかを体感する**

### 手順

1. `src/4-functions/formatUserName.ts` ファイルを開いてください。
2. ファイル内の **課題 1 ～ 3** に取り組み、関数を実装します。
3. 以下の各課題を順に実装してください：

#### 課題 1: オプション引数

```ts
// 課題1: ユーザー名と任意の役職を受け取り、フォーマットする関数を実装してください
// - role がある場合: "名前 (役職)" の形式で返す
// - role がない場合: "名前" だけを返す

export function formatUserName(name: string, role?: string): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserName("Alice"));           // "Alice"
console.log(formatUserName("Bob", "Designer")); // "Bob (Designer)"
```

**純粋関数の観点**
- 関数は引数だけで結果が決まるように実装し、外部の変数や状態を変更しない。
- 同じ引数ならいつ呼び出しても同じ結果が返る → **テストや保守が楽**！

#### 課題 2: デフォルト値

```ts
// 課題2: 役職にデフォルト値 "Guest" を設定した関数を実装してください
// - 引数 role を省略したときに "Guest" が代わりに使われます
// - 出力形式は課題1と同様: "名前 (役職)"

export function formatUserNameWithDefault(name: string, role = "Guest"): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserNameWithDefault("Charlie"));       // "Charlie (Guest)"
console.log(formatUserNameWithDefault("Dave", "Admin")); // "Dave (Admin)"
```

**純粋関数の観点**
- 外部の状態に依存せず、同じ引数なら常に同じ出力になる。
- role が渡されなかった場合でも一貫した初期値 ("Guest") を設定できる。

#### 課題 3: 追加（純粋関数で管理しやすいコードを書いてみよう）

```ts
// 課題3: オプション引数とデフォルト値を組み合わせた関数を実装してください
// - name: 必須のユーザー名
// - role: 任意の役職
// - prefix: デフォルト値 "User:" を持つ接頭辞
//
// 【ポイント】
// 1. 可能な限り、引数とその組み合わせだけで結果を決める
// 2. 同じ引数で呼び出せば常に同じ結果が得られるコード設計を意識する

export function formatUserNameCombined(
  name: string,
  role?: string,
  prefix = "User:",
): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserNameCombined("Eve"));                     // "User: Eve"
console.log(formatUserNameCombined("Frank", "Developer"));      // "User: Frank (Developer)"
console.log(formatUserNameCombined("Grace", "Manager", "EMP:")) // "EMP: Grace (Manager)"
```

4. **トランスパイルして実行**

   ```bash
   npm run build
   node dist/4-functions/formatUserName.js
   ```

5. **テストを実行し、正しく実装できているか確認**

   ```bash
   npm run test -- src/4-functions/formatUserName.test.ts
   ```

### チェックポイント

- オプション引数 (`role?: string`) の動作を正しく理解しているか
- デフォルト値 (`role = 'Guest'`) を正しく使いこなせているか
- **関数内部で外部状態を変更していない** かどうか（純粋関数的アプローチ）
- 関数の戻り値の型を適切に設定できるか
- オプション引数とデフォルト値の違いを説明できるか

### 発展課題（任意）

以下の点について、コメントとして考察を追加してみましょう：

- **オプション引数 (`role?: string`)**  
  - 「引数を渡さない」こと自体を許容し、関数側で受け取ったときに `undefined` になる場合がある。

- **デフォルト値 (`role = "Guest"`)**  
  - 引数が `undefined` の場合にデフォルト値が自動的に代入される。  
  - 例: `formatUserNameWithDefault("Charlie")` → "Charlie (Guest)"

- **純粋関数 (Pure Function) のメリット**  
  - **同じ引数 → 同じ結果** なのでロジックが明快、テストもしやすい。  
  - 外部の状態を変えないので、バグの原因が追いやすくなる（副作用が少ない）。

---

## 参考情報

- [TypeScript: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [TypeScript: Optional Parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)
- [TypeScript: Default Parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#default-parameters)
- [サバイバルTypeScript - 関数](https://typescriptbook.jp/reference/functions)
