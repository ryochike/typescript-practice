// 課題: ジェネリクスを使った汎用配列操作関数

// TODO: 配列とインデックスを受け取り、配列要素を返すジェネリック関数を実装してください
// 1. 関数は配列とインデックスを受け取り、そのインデックスの要素を返します
// 2. 配列の範囲外の場合は undefined を返すようにします
// 3. 関数は純粋関数として実装してください（副作用なし）
// 4. 以下の型の配列に対応できるように、ジェネリクス（型パラメータ）を使って実装してください
//    - 数値の配列: number[]
//    - 文字列の配列: string[]
//    - オブジェクトの配列: UserData[]

// ここにジェネリック関数 getElement を実装してください
// ヒント: <T>を使って任意の型の配列を受け取れるようにします

// テスト用のコード（これは変更しないでください）
// 数値配列のテスト
const numArray = [10, 20, 30, 40, 50];
console.log("数値配列のテスト:");
console.log(`インデックス1の要素: ${getElement(numArray, 1)}`); // => 20
console.log(`範囲外のインデックス: ${getElement(numArray, 99)}`); // => undefined

// 文字列配列のテスト
const strArray = ["apple", "banana", "cherry", "date"];
console.log("\n文字列配列のテスト:");
console.log(`インデックス2の要素: ${getElement(strArray, 2)}`); // => cherry

// 明示的に型パラメータを指定したバージョン
console.log(`明示的な型指定: ${getElement<string>(strArray, 3)}`); // => date

// オブジェクト配列のテスト
interface UserData {
  id: number;
  name: string;
}

const userArray: UserData[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// オブジェクト配列から要素を取得
const user = getElement(userArray, 1);
console.log("\nオブジェクト配列のテスト:");
console.log(user); // => { id: 2, name: 'Bob' }

// ==========================================
// ここまではgetElement関数に関する課題です
// ここから下は発展課題のサンプルコードです
// ==========================================

// ジェネリクス型引数に制約を付ける例
// 「lengthプロパティを持つ型」という制約を付ける
function getItemLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// 様々な「lengthを持つ型」でテスト
console.log("\n制約付きジェネリクスのテスト:");
console.log(`文字列の長さ: ${getItemLength("hello")}`); // => 5
console.log(`配列の長さ: ${getItemLength([1, 2, 3, 4])}`); // => 4
console.log(
  `カスタムオブジェクトの長さ: ${getItemLength({ length: 10, name: "Test" })}`,
); // => 10
