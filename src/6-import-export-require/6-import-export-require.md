# 6. import / export / require

このセクションでは、TypeScriptのモジュールシステムについて学びます。モジュール分割の方法と、ES ModulesとCommonJSの両方のモジュールシステムの違いを理解しましょう。

## 6-1. モジュール分割を体験する

### 概要

複数ファイルに分割したコードを `import/export` でやり取りし、モジュールシステムの基本を理解します。さらに、CommonJS (`require`) と ES Modules (`import`) の違いも体験し、実際の開発でどのように使い分けるかを学びましょう。

### 目的・ゴール

- ES Modules の基本構文（`import` / `export`）を使える
- CommonJS (`require`) との違いを理解し、両方を使ってみる
- ファイル分割のメリットとモジュール解決の仕組みを把握する
- `tsconfig.json` や `package.json` の設定によるモジュール解決の違いを知る
- `default export` の注意点とベストプラクティスを学ぶ
- モジュール分割によるテストのしやすさを体験する

### 手順

#### 6-1-1. 基本的な `import/export` の使い方

1. 以下の構造でディレクトリを作ってください。

   ```txt
   src/
     mathUtil.ts
     index.ts
   ```

2. **`mathUtil.ts`**  
   加算・乗算・除算・減算などの関数を定義し、名前付きエクスポートしてください。

   ```ts
   // mathUtil.ts

   /**
    * 2数の加算
    */
   export function add(a: number, b: number): number {
     return a + b;
   }

   /**
    * 2数の乗算
    */
   export function multiply(a: number, b: number): number {
     return a * b;
   }

   /**
    * 2数の除算（0で割ろうとした場合はエラー）
    */
   export function divide(a: number, b: number): number {
     if (b === 0) {
       throw new Error('Cannot divide by 0');
     }
     return a / b;
   }

   /**
    * 2数の減算
    */
   export function subtract(a: number, b: number): number {
     return a - b;
   }

   // ---- ここ以降はデフォルトエクスポートの例 ----
   // すべての関数を含むオブジェクトをデフォルトエクスポート
   export default {
     add,
     multiply,
     divide,
     subtract,
   };
   ```

3. **`index.ts`**  
   上記の関数を `import` し、実行して結果をコンソールに出すプログラムを書きます。さまざまなインポート形式を試してみましょう。

   ```ts
   // index.ts
   // 1. 名前付きインポート
   import { add, multiply } from './mathUtil';

   console.log("------ 名前付きインポート ------");
   console.log("2 + 3 =", add(2, 3));
   console.log("4 × 6 =", multiply(4, 6));

   // 2. 名前変更（別名）でインポート
   import { divide as safeDiv, subtract as minus } from './mathUtil';

   console.log("\n------ 別名でインポート ------");
   console.log("10 ÷ 2 =", safeDiv(10, 2));
   console.log("7 - 3 =", minus(7, 3));

   // 3. デフォルトインポート
   import mathUtils from './mathUtil';

   console.log("\n------ デフォルトインポート ------");
   console.log("5 + 5 =", mathUtils.add(5, 5));
   console.log("8 × 3 =", mathUtils.multiply(8, 3));

   // 4. 全てをオブジェクトとしてインポート (名前空間インポート)
   import * as math from './mathUtil';

   console.log("\n------ 名前空間としてインポート ------");
   console.log("9 ÷ 3 =", math.divide(9, 3));
   console.log("10 - 5 =", math.subtract(10, 5));

   // 5. エラーハンドリングの例
   console.log("\n------ エラーハンドリング ------");
   try {
     const result = divide(10, 0);
     console.log("10 ÷ 0 =", result);
   } catch (error) {
     console.error("エラーが発生:", (error as Error).message);
   }
   ```

4. `tsc` でコンパイル後、`node dist/index.js` などで実行し、正常に動作するか確認してください。

#### 6-1-2. CommonJS (`require`) との比較体験

1. **`require` で読み込むサンプルファイルを作成**  
   例として `index_cjs.ts` というファイルを作り、次のように `require` を使って `mathUtil` を読み込んでみましょう。

   ```ts
   // index_cjs.ts

   // CommonJSスタイル
   const mathUtil = require('./mathUtil');

   // 補完の様子などを観察
   console.log("------ CommonJS (require) の例 ------");
   console.log("2 + 3 =", mathUtil.add(2, 3));
   console.log("4 × 6 =", mathUtil.multiply(4, 6));

   // CJS形式だとTSの型補完が効かない (mathUtilの型が any になりがち)
   ```

2. `tsc` でコンパイルするときに、`module` オプションが `"commonjs"` になっているか、もしくは `tsconfig.json` の設定がどうなっているか確認してください。`module: "commonjs"` なら、コンパイル後は `require` 形式が維持されます。

3. 実際に `node dist/index_cjs.js` を実行し、出力結果を見てください。

5. **テストを実行して確認**
   ```bash
   npm run test -- src/6-import-export-require/index.test.ts
   npm run test -- src/6-import-export-require/index_cjs.test.ts
   ```

### チェックポイント

- 相対パス指定（例: `./mathUtil`）でエラーにならないように注意する
- `import` のさまざまなパターン（名前付き、別名、デフォルト、名前空間）を一通り試せているか
- 加減乗除が正しく計算されるか、除算時のエラーがキャッチできるかを確認できたか
- **TSのエディタ補完:** `require` を使うと、型が推論されず `any` 扱いになることがある
- **構文上の差:** `import` はファイル先頭でのみ使用できるが、 `require` は動的に呼び出せる
- **可能な限り `import` を使うのがベター** という方針を理解したか

### 発展課題（任意）

#### `default export` の注意点とベストプラクティス

- **利点:**  
  シンプルなモジュールなら「メイン機能1つをデフォルトエクスポート」という書き方はわかりやすい。

- **欠点:**  
  - インポート時に自由に名前を付けられるので、プロジェクト全体でインポート名が乱立しやすい。  

    ```ts
    // 同じモジュールをインポートしているのに名前が異なる例
    import mainFunction from './mathUtil';
    import superCalc from './mathUtil';
    ```

  - 定義側のリファクタリングで名前を変えても、呼び出し側の名前には反映されない（ズレが生じる）。  
  - ESLint設定で「デフォルトエクスポート禁止」を推奨するチームもある。

#### `tsconfig.json` と `package.json` の関係

- **`module` オプション:** `"commonjs"` や `"esnext"` などに応じて、コンパイル結果のJS形式が変わる。
- **`package.json` の `"type": "module"`:** これをつけると `.js` ファイルが ESM として扱われ、`import` がそのまま使える。一方で CommonJS パッケージとは相性が悪くなる場合がある。
- **`target` オプション:** Node.jsのバージョンに合わせて指定。Node16以降なら `"ES2020"` や `"ES2021"` でも問題なく動作可能。
- **`moduleResolution` の設定:** 通常は `"node"` でOKだが、Node.js ESMを完全に再現するには `"nodenext"` や `"node16"` を使うなど状況に応じて選ぶ。

---

## 参考情報

- [TypeScript: Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript: Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [サバイバルTypeScript - import、export、require](https://typescriptbook.jp/reference/import-export-require)
