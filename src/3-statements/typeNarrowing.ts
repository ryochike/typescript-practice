// 課題: ユニオン型と型ナロイング

/**
 * 課題1: number か string を受け取り、型によって処理を分岐する関数を実装してください
 *
 * - 数値の場合: 平方値を計算して "Squared: 数値" という形式で返す
 * - 文字列の場合: 文字列の長さを計算して "Length: 長さ" という形式で返す
 *
 * 【ポイント】
 * typeof演算子を使って型を判定すると、TypeScriptはその条件ブロック内で
 * 自動的に型を絞り込む（型ナロイング）ことができます。
 */
function processValue(value: number | string): string {
  // ここにコードを実装してください
  // ヒント: typeof value === "number" の形で型を判定できます

  return "";
}

// テスト
console.log(processValue(5)); // "Squared: 25" と出力されるはずです
console.log(processValue("Hello")); // "Length: 5" と出力されるはずです

/**
 * より複雑な型ナロイングを体験してみましょう
 * 判別可能なユニオン型（Discriminated Union）を使用します
 *
 * 以下の型定義は、「共通のプロパティ（kind）で型を区別できる」
 * 判別可能なユニオン型の代表的なパターンです。
 */

// 円を表す型
type Circle = {
  kind: "circle"; // リテラル型による判別子
  radius: number;
};

// 長方形を表す型
type Rectangle = {
  kind: "rectangle"; // リテラル型による判別子
  width: number;
  height: number;
};

// Shape型（CircleまたはRectangle）
type Shape = Circle | Rectangle;

/**
 * 課題2: 図形の面積を計算する関数を実装してください
 * - Circle: π × radius²
 * - Rectangle: width × height
 *
 * 【ポイント】
 * switch文とshape.kindを使って型を絞り込みましょう。
 * また、default節で「網羅性チェック(exhaustive check)」を実装すると、
 * 将来Shapeに新しい型が追加された場合もコンパイルエラーで検出できます。
 */
function calculateArea(shape: Shape): number {
  // ここにコードを実装してください
  // switch文を使ってshape.kindで分岐し、適切な計算を行いましょう

  return 0; // TODO: 適切な実装に置き換えてください
}

// テスト用オブジェクト
const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

// テスト
console.log(`Circle area: ${calculateArea(circle)}`); // "Circle area: 78.53981633974483" と出力されるはずです
console.log(`Rectangle area: ${calculateArea(rectangle)}`); // "Rectangle area: 24" と出力されるはずです

/**
 * 発展課題:
 * 1. typeof やswitch以外の型ナロイングの方法も試してみましょう
 *    - instanceof演算子: クラスのインスタンスかどうかを判定
 *    - in演算子: オブジェクトにプロパティが存在するかを判定
 *    - タイプガード関数(Type Predicate):
 *      例) function isCircle(shape: Shape): shape is Circle { ... }
 *
 * 2. 三角形など新しい図形を追加してみましょう
 *    - Triangle型 { kind: "triangle", base: number, height: number } を追加し、
 *      calculateArea関数を拡張してみましょう
 *    - exhaustive checkを使っていると、この追加時にコンパイルエラーで
 *      実装漏れを防ぐことができます
 */

/* 発展課題の実装例:

// 三角形を表す型
type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

// Shape型を拡張
type Shape = Circle | Rectangle | Triangle;

// ユーザー定義型ガード関数の例
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

*/
