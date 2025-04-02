// 課題: Promiseと非同期処理の基本

/**
 * ランダムな数値を返す擬似API関数
 * 1秒後に0〜99のランダムな整数を返します
 */
export function fetchRandomNumber(): Promise<number> {
  // TODO: Promiseを返す関数を実装してください
  // ヒント: setTimeout関数を使って1秒後に結果を返すようにしましょう
  return Promise.resolve(0); // このコードを修正してください
}

/**
 * エラーをランダムに発生させる関数（発展課題用）
 * 50%の確率でエラーを返します
 */
export function fetchWithRandomError(): Promise<number> {
  // TODO: 50%の確率でエラーを発生させるPromiseを実装してください
  // ヒント: Math.random() > 0.5 を使ってランダムにエラーを発生させましょう
  return Promise.resolve(0); // このコードを修正してください
}

/**
 * 指定した値とディレイ時間でデータを返す関数
 * @param data 返すデータ
 * @param delayMs 遅延時間（ミリ秒）
 */
export function fetchDataWithDelay<T>(data: T, delayMs: number): Promise<T> {
  // TODO: 指定時間後に指定データを返すPromiseを実装してください
  return Promise.resolve(data); // このコードを修正してください
}

/**
 * タイムアウト付きのPromiseを作成する関数
 * @param promise 元のPromise
 * @param timeoutMs タイムアウト時間（ミリ秒）
 */
export function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  // TODO: タイムアウト機能を実装してください
  // ヒント: Promise.race()を使って元のPromiseとタイムアウト用Promiseを競争させます
  return promise; // このコードを修正してください
}
