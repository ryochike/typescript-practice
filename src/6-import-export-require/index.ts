// 課題: 様々なimport形式を試す

// 1. 名前付きインポート
// TODO: mathUtilモジュールからadd関数とmultiply関数をインポートしてください
// import { ... } from './utils/mathUtil';

console.log("------ 名前付きインポート ------");
console.log("2 + 3 ="); // TODO: add関数を使って2+3の結果を表示してください
console.log("4 × 6 ="); // TODO: multiply関数を使って4×6の結果を表示してください

// 2. 名前変更（別名）でインポート
// TODO: mathUtilモジュールからdivide関数をsafeDiv、subtract関数をminusという別名でインポートしてください
// import { ... as ..., ... as ... } from './utils/mathUtil';

console.log("\n------ 別名でインポート ------");
console.log("10 ÷ 2 ="); // TODO: safeDiv関数を使って10÷2の結果を表示してください
console.log("7 - 3 ="); // TODO: minus関数を使って7-3の結果を表示してください

// 3. デフォルトインポート
// TODO: mathUtilモジュールをデフォルトインポートしてください
// import ... from './utils/mathUtil';

console.log("\n------ デフォルトインポート ------");
console.log("5 + 5 ="); // TODO: mathUtils.add関数を使って5+5の結果を表示してください
console.log("8 × 3 ="); // TODO: mathUtils.multiply関数を使って8×3の結果を表示してください

// 4. 全てをオブジェクトとしてインポート (名前空間インポート)
// TODO: mathUtilモジュール全体をmath名前空間としてインポートしてください
// import * as ... from './utils/mathUtil';

console.log("\n------ 名前空間としてインポート ------");
console.log("9 ÷ 3 ="); // TODO: math.divide関数を使って9÷3の結果を表示してください
console.log("10 - 5 ="); // TODO: math.subtract関数を使って10-5の結果を表示してください

// 5. エラーハンドリングの例
console.log("\n------ エラーハンドリング ------");
// TODO: try-catchブロックを使って、0で割った場合のエラーハンドリングを実装してください
// try {
//   const result = 名前空間.divide(10, 0);
//   console.log("10 ÷ 0 =", result); // このコードは実行されないはず
// } catch (error) {
//   console.error("エラーが発生:", (error as Error).message);
// }
