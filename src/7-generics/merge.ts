// 課題: 複数の型パラメータを持つジェネリック関数

// TODO: 2つのオブジェクトをマージするジェネリック関数を実装してください
// 1. 関数名は「merge」とし、2つのオブジェクト objA, objB を受け取ります
// 2. 2つのオブジェクトをマージした新しいオブジェクトを返します
// 3. 型パラメータを複数使用して、2つの異なる型のオブジェクトに対応できるようにしてください
// 4. 戻り値の型は、両方のオブジェクトのプロパティを持つ型になるよう定義してください
// 5. オブジェクトのマージには、スプレッド構文 { ...objA, ...objB } を使用します

// ここにジェネリック関数 merge を実装してください
// ヒント1: 2つの型パラメータ<A, B>を使うと、異なる型のオブジェクトを受け取れます
// ヒント2: 交差型（A & B）を使うと、両方の型のプロパティを持つ型を表現できます

// 以下はテスト用のコードです（これは変更しないでください）
// 商品情報とその在庫状況をマージする例
const product = { id: 1, name: "TypeScript入門" };
const stock = { price: 2800, inStock: true };

const productWithStock = merge(product, stock);

console.log("マージされたオブジェクト:");
console.log(productWithStock);
// 出力例: { id: 1, name: 'TypeScript入門', price: 2800, inStock: true }

// 型安全にアクセスできることを確認
console.log(`商品名: ${productWithStock.name}`);
console.log(`価格: ${productWithStock.price}円`);

// ユーザーとその権限情報をマージする例
interface User {
  id: number;
  username: string;
}

interface Permissions {
  canEdit: boolean;
  canDelete: boolean;
  role: string;
}

const user: User = {
  id: 101,
  username: "typescript_user",
};

const permissions: Permissions = {
  canEdit: true,
  canDelete: false,
  role: "editor",
};

const userWithPermissions = merge(user, permissions);
console.log("\nユーザーと権限情報:");
console.log(userWithPermissions);
console.log(`ユーザー名: ${userWithPermissions.username}`);
console.log(`ロール: ${userWithPermissions.role}`);

// 発展: 3つ以上のオブジェクトをマージする場合は、mergeを複数回呼び出すことで対応できます
// const result = merge(merge(obj1, obj2), obj3);
