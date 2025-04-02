// 課題: 制約付きジェネリクス関数の実装

// TODO: オブジェクト配列から特定のプロパティを取り出すジェネリック関数 pluck を実装してください
// 1. 関数はオブジェクトの配列とプロパティ名を受け取ります
// 2. 配列内の各オブジェクトから指定されたプロパティの値を抽出し、新しい配列として返します
// 3. 指定されたプロパティがオブジェクトに存在することを型レベルで保証する仕組みを実装してください
// 4. 戻り値の型は、抽出したプロパティの型を正しく反映させてください

// ここにジェネリック関数 pluck を実装してください
// ヒント1: 型パラメータを2つ使います（例: <T, K>）
// ヒント2: extends キーワードと keyof を使って、Kが「Tのプロパティ名」であることを制約できます
// ヒント3: Array<T[K]> を戻り値の型にすると、プロパティの型が配列の要素型になります
// ヒント4: array.map() メソッドを使うと配列から新しい配列を作れます

// 以下はテスト用のコードです（これは変更しないでください）
// ユーザー情報からの特定プロパティ抽出
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
];

// 名前一覧を抽出
const names = pluck(users, "name");
console.log("ユーザー名一覧:");
console.log(names); // => ["Alice", "Bob", "Charlie"]

// 年齢一覧を抽出
const ages = pluck(users, "age");
console.log("\n年齢一覧:");
console.log(ages); // => [25, 30, 22]

// 平均年齢を計算
const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
console.log(`平均年齢: ${averageAge}`);

// 商品データからの特定プロパティ抽出
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: "p1", name: "ノートPC", price: 80000, inStock: true },
  { id: "p2", name: "タブレット", price: 50000, inStock: false },
  { id: "p3", name: "スマートフォン", price: 60000, inStock: true },
];

// 在庫のある商品のIDを抽出
const inStockProducts = products.filter((product) => product.inStock);
const inStockIds = pluck(inStockProducts, "id");
console.log("\n在庫がある商品ID:");
console.log(inStockIds);

// 商品価格一覧を抽出
const prices = pluck(products, "price");
console.log("\n商品価格一覧:");
console.log(prices);

// このコードを実行すると、存在しないプロパティを指定した場合にコンパイルエラーになります
// pluck(users, "nonExistentProperty"); // Error: 'nonExistentProperty' is not assignable to parameter of type 'keyof User'
