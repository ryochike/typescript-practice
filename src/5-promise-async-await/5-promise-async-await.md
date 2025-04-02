# 5. Promise / async / await

このセクションでは、TypeScriptでの非同期処理を学びます。Promise、async/await構文を使った非同期プログラミングの基礎を身につけ、効率的なコードの書き方を習得します。

## 5-1. 非同期処理の基礎

### 概要

このセクションでは、**Promise**を使った基本的な非同期処理のフローを学び、**`async/await`** 構文との比較を通じて、コードの可読性や保守性への影響を体感します。さらに、**Promise.all** での並列実行やエラー処理の基本を身につけ、非同期プログラミングの基礎を固めます。

> **Note:** 非同期処理はWeb開発で特に重要で、APIリクエスト、ファイル操作、タイマーなど様々な場面で使用されます。TypeScriptは型システムを通じて非同期処理をより安全に扱えるようにします。

### 目的・ゴール

- **Promise**を使った基本的な非同期処理のフローを理解する
- **`async/await`** 構文との比較を通じて、コードの可読性や保守性への影響を体感する
- **Promise.all** での並列実行やエラー処理の基本を学び、非同期プログラミングの基礎を固める

### 手順

1. **擬似API関数を実装する**
   - `fakeApi.ts` ファイルを開き、Promiseを返す関数を実装します。

   ```ts
   /**
    * 1秒後に0〜99のランダムな整数を返す
    */
   export function fetchRandomNumber(): Promise<number> {
     return new Promise((resolve) => {
       setTimeout(() => {
         const randomValue = Math.floor(Math.random() * 100);
         resolve(randomValue);
       }, 1000);
     });
   }
   ```

   - **ポイント**
     - TypeScript では、戻り値の型を **`Promise<number>`** と明示します。
     - 1秒後に `resolve` を呼ぶことで、Promiseが完了し、ランダムな数値が返されます。

2. **Promiseチェーンで値を取得する**
   - `main.ts` ファイルを開き、`fetchRandomNumber` を呼び出す関数を定義します。
   - **Promiseチェーン（`then` / `catch`）** を使って、取得結果をコンソールに表示します。

   ```ts
   import { fetchRandomNumber } from "./fakeApi";

   function mainPromise() {
     console.log("Promiseチェーンを使った実装:");
     fetchRandomNumber()
       .then((value) => {
         console.log(`取得した数値: ${value}`);
       })
       .catch((err) => {
         console.error("エラー:", err);
       })
       .finally(() => {
         console.log("Promiseチェーン処理完了");
       });
   }

   mainPromise();
   ```

   - **チェックポイント**
     - `then` コールバックで受け取れる値が `number` 型であること（TypeScriptの型推論を確認してみてください）。
     - `catch` でエラーを捕捉できるか。

3. **`async/await` で同じ処理を書く**
   - 同じ `fetchRandomNumber` を **`async/await`** を使って呼び出す関数 `mainAsync()` を定義します。

   ```ts
   async function mainAsync() {
     console.log("async/awaitを使った実装:");
     try {
       const value = await fetchRandomNumber();
       console.log(`取得した数値: ${value}`);
     } catch (error) {
       console.error("エラー:", error);
     } finally {
       console.log("async/await処理完了");
     }
   }

   // mainAsync(); // 実行したいときにコメントアウトを外す
   ```

   - **チェックポイント**
     - `await` を使用できるのは、`async function` の中だけです。
     - `try/catch` ブロックでエラーを補足します。
     - `async/await` はほぼ同期処理のように記述できるため、Promiseチェーンと比べて可読性がどう変わったか考えてみましょう。

4. **Promise.all で並列実行**
   - 複数の `fetchRandomNumber` を同時に呼び出す処理を実装します。
   - **`Promise.all([ ... ])`** を使い、結果の配列が返ってくることを確認します。

   ```ts
   async function fetchMultipleNumbers() {
     console.log("複数の非同期処理を並列実行:");
     try {
       console.time("並列処理時間");
       const results = await Promise.all([
         fetchRandomNumber(),
         fetchRandomNumber(),
         fetchRandomNumber(),
       ]);
       console.timeEnd("並列処理時間");

       console.log("取得した数値:", results);
       const sum = results.reduce((total, num) => total + num, 0);
       console.log("合計値:", sum);
     } catch (error) {
       console.error("エラー:", error);
     }
   }

   // fetchMultipleNumbers(); // 実行したいときにコメントアウトを外す
   ```

   - **チェックポイント**
     - **Promise.all** は、渡したPromiseの**配列の順番**に応じて結果を並べた配列を返します。
     - いずれかのPromiseが拒否（エラー）されると、**即座に`catch`に移行**します。

5. **コードをトランスパイルして実行**
   ```bash
   npm run build
   node dist/5-promise-async-await/main.js
   ```

6. **テストの実行と確認**
   ```bash
   npm run test -- src/5-promise-async-await/promise.test.ts
   ```

### チェックポイント

- Promiseの基本構造（`new Promise((resolve, reject) => { ... })`）を理解できているか
- `then`/`catch`/`finally` メソッドチェーンの使い方を把握しているか
- `async`/`await` 構文を使って非同期処理を同期処理のように書けるか
- `Promise.all` を使って複数の非同期処理を並列実行できるか
- エラーハンドリングを適切に実装できているか

### 発展課題（任意）

1. **ランダムエラー発生関数を実装する**
   ```ts
   /**
    * 1秒後に50%の確率でエラーを返す
    */
   export function fetchWithRandomError(): Promise<number> {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         const shouldFail = Math.random() > 0.5; // 50%の確率
         if (shouldFail) {
           reject(new Error("ランダムエラーが発生しました"));
         } else {
           const randomValue = Math.floor(Math.random() * 100);
           resolve(randomValue);
         }
       }, 1000);
     });
   }
   ```

2. **エラー処理の実装**
   - `fetchWithRandomError` を使用して、エラーハンドリングを実践してみましょう。
   - 成功した場合と失敗した場合の挙動を、Promiseチェーンと`async/await`の両方で確かめてみてください。

3. **Promise.allSettled を使ってみる**
   - `Promise.allSettled` を使って、失敗しても全件の結果を取得する方法を試してみましょう。

4. **リトライ機構の実装**
   - エラーが発生した場合に、一定回数再試行するロジックを作ってみましょう。

5. **まとめレポート**
   - 下記の項目を自分の言葉でまとめてみましょう（箇条書きでOK）
     1. **Promiseチェーン** と **async/await** の構造的な違い
     2. エラーハンドリング（`catch` vs `try/catch`）の書き方や挙動の違い
     3. 複数の非同期処理を同時に走らせるメリットと、**Promise.all** の使い所
     4. 全体を通してどちらの書き方が読みやすいと思ったか、その理由

---

## 参考情報

- [TypeScript: Promise](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-promisetype-type)
- [MDN Web Docs: Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [サバイバルTypeScript - Promise / async / await](https://typescriptbook.jp/reference/promise-async-await)
