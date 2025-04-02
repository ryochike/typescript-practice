/**
 * mathUtil.tsモジュールのテストファイル（Node.js assertバージョン）
 *
 * このファイルは、数学関数のテストケースを自分で考えて実装するための
 * テンプレートです。
 *
 * Node.jsの標準assertモジュールを使ったテストの書き方を学びましょう。
 *
 * 注意: このファイルは.cjs拡張子で保存する必要があります。
 * 現在のプロジェクトは "type": "module" 設定のため、.jsファイルはESモジュールとして扱われます。
 * CommonJSの機能（require関数など）を使うには.cjs拡張子が必要です。
 */

const assert = require("node:assert");
const path = require("node:path");

// コンパイル済みJavaScriptファイルからmathUtilをインポート
// build後のファイルパスを指定する必要があります
const mathUtilPath = path.resolve(
  __dirname,
  "../../../dist/src/6-import-export-require/utils/mathUtil.js",
);

// テスト実行用のヘルパー関数
function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`✅ PASSED: ${testName}`);
    return true;
  } catch (error) {
    console.error(`❌ FAILED: ${testName}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// mathUtilのインポート
let mathUtil;
try {
  mathUtil = require(mathUtilPath);
  console.log("mathUtilモジュールを正常にインポートしました");
} catch (error) {
  console.error(
    `mathUtilモジュールのインポートに失敗しました: ${error.message}`,
  );
  console.error(
    "先に npm run build を実行してTypeScriptファイルをコンパイルしてください",
  );
  process.exit(1);
}

// テスト実行カウンタ
let totalTests = 0;
let passedTests = 0;

console.log("\n==== add関数のテスト ====");
// TODO: add関数のテストケースを実装してください
// ヒント: 以下のようなテストケースを考えましょう
// - 正の数の加算（例: 2 + 3 = 5）
// - 負の数の加算（例: -1 + -2 = -3）
// - 小数の加算（例: 0.1 + 0.2 ≈ 0.3）
// - ゼロとの加算（例: 0 + 5 = 5）

// サンプルテスト（このテストは必ず失敗します - 自分で実装してください）
totalTests++;
if (
  runTest(
    "サンプルテスト - このテストは必ず失敗します（自分で実装してください）",
    () => {
      assert.strictEqual(true, false); // このテストは必ず失敗します。自分でテストを実装してください
    },
  )
)
  passedTests++;

console.log("\n==== multiply関数のテスト ====");
// TODO: multiply関数のテストケースを実装してください
// ヒント: 以下のようなテストケースを考えましょう
// - 正の数の乗算（例: 2 * 3 = 6）
// - 負の数の乗算（例: -2 * 3 = -6, -2 * -3 = 6）
// - ゼロとの乗算（例: 0 * 5 = 0）

console.log("\n==== divide関数のテスト ====");
// TODO: divide関数のテストケースを実装してください
// ヒント: 以下のようなテストケースを考えましょう
// - 正の数の除算（例: 6 / 3 = 2）
// - 負の数の除算（例: -6 / 3 = -2, -6 / -3 = 2）
// - 小数が出る除算（例: 5 / 2 = 2.5）
// - エラーケース: ゼロでの除算（例外がスローされるべき）

/* ヒント: エラーのテスト方法
totalTests++;
if (runTest('ゼロで割ると例外がスローされるべき', () => {
  assert.throws(() => mathUtil.divide(10, 0), /ゼロで除算できません/);
})) passedTests++;
*/

console.log("\n==== subtract関数のテスト ====");
// TODO: subtract関数のテストケースを実装してください
// ヒント: 以下のようなテストケースを考えましょう
// - 正の数の減算（例: 5 - 3 = 2）
// - 負の結果になる減算（例: 3 - 5 = -2）
// - 負の数との減算（例: -3 - -5 = 2）

// オプション: デフォルトエクスポートのテスト
console.log("\n==== デフォルトエクスポートのテスト ====");
// TODO: デフォルトエクスポートのテストを実装してください

// テスト結果のサマリー
console.log("\n==== テスト結果のサマリー ====");
console.log(`合計テスト数: ${totalTests}`);
console.log(`成功したテスト: ${passedTests}`);
console.log(`失敗したテスト: ${totalTests - passedTests}`);

if (passedTests === totalTests) {
  console.log("🎉 すべてのテストに合格しました！");
} else {
  console.log("❌ 一部のテストが失敗しました。");
}

/**
 * テストの実行方法:
 *
 * 1. TypeScriptファイルをコンパイル: npm run build
 * 2. テスト実行: node src/6-import-export-require/utils/mathUtil.assert.test.cjs
 *
 * ヒント:
 * - 回答例は answers/6-import-export-require/utils/mathUtil.assert.test.js にあります
 * - まずは自分でテストケースを考えて実装してみましょう
 */
