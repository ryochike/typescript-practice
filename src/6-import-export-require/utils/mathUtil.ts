// 課題: 数学的な関数をエクスポートするモジュール

/**
 * 2数の加算を行う関数
 */
export function add(a: number, b: number): number {
  // TODO: 2つの数値を加算する処理を実装してください
  return 0; // この行を実装に置き換えてください
}

/**
 * 2数の乗算を行う関数
 */
export function multiply(a: number, b: number): number {
  // TODO: 2つの数値を乗算する処理を実装してください
  return 0; // この行を実装に置き換えてください
}

/**
 * 2数の除算を行う関数
 * @throws {Error} 0で割ろうとした場合
 */
export function divide(a: number, b: number): number {
  // TODO: 2つの数値の除算を実装してください
  // 0で割る場合はエラーをスローしてください
  return 0; // この行を実装に置き換えてください
}

/**
 * 2数の減算を行う関数
 */
export function subtract(a: number, b: number): number {
  // TODO: 2つの数値の減算を実装してください
  return 0; // この行を実装に置き換えてください
}

// デフォルトエクスポートの例
// すべての関数を含むオブジェクトをデフォルトエクスポート
export default {
  add,
  multiply,
  divide,
  subtract,
};

// ヒント: 回答例は answers/6-import-export-require/utils/mathUtil.ts にあります
