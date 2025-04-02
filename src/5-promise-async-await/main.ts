// 課題: Promiseと非同期処理の実践

// 課題1: Promiseチェーンを使った実装
function mainPromise() {
  console.log("Promiseチェーンを使った実装:");
  // TODO: fetchRandomNumberを呼び出し、Promiseチェーン（then/catch/finally）を使って結果を処理してください
  // ヒント: .then()で成功時の処理、.catch()でエラー処理、.finally()で共通処理を実装します
}

// 課題2: async/awaitを使った実装
async function mainAsync() {
  console.log("async/awaitを使った実装:");
  // TODO: fetchRandomNumberを呼び出し、async/await構文とtry/catchを使って処理してください
  // ヒント: try { const value = await fetchRandomNumber(); } catch(error) { ... } finallyを使います
}

// 課題3: 複数の非同期処理を並列実行
async function fetchMultipleNumbers() {
  console.log("複数の非同期処理を並列実行:");
  // TODO: Promise.allを使って複数のfetchRandomNumber()を並列実行し、結果の配列を処理してください
  // ヒント: Promise.all([promise1, promise2, promise3])で複数のPromiseを同時に実行できます
}

// 発展課題1: Promise.allSettledを使った実装
async function fetchWithAllSettled() {
  console.log("Promise.allSettledを使った実装:");
  // TODO: Promise.allSettledを使って、成功と失敗が混在するPromiseの結果をすべて取得してください
  // ヒント: fetchWithRandomError()を使い、results.status === "fulfilled"で成功/失敗を判定します
}

// 発展課題2: リトライ機能の実装
async function fetchWithRetry(maxRetries = 3) {
  console.log("リトライ機能を使った実装:");
  // TODO: 失敗したら再試行する機能を実装してください
  // ヒント: while(retry <= maxRetries) { try { ... } catch { retry++ } } の構造を使います
}

// 発展課題3: タイムアウト処理の実装
async function testTimeoutExample() {
  console.log("タイムアウト処理の実装:");
  // TODO: fetchWithTimeoutを使って、タイムアウトするケースとしないケースをテストしてください
  // ヒント: タイムアウト時間より長い処理と短い処理の両方をテストします
}

// 実行する処理を選んでコメントアウトを外してください
console.log("--------プログラム開始--------");

// mainPromise();

// setTimeout(() => {
//   console.log("\n"); // 改行
//   mainAsync();
// }, 2000);
