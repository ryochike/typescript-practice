// 課題: ジェネリッククラスの使用例

import { GenericBox } from "./GenericBox";

console.log("------ ジェネリックボックスのデモ ------");

// 1. 文字列を格納するボックス
const stringBox = new GenericBox<string>("Hello TypeScript");
console.log("文字列ボックスの値:", stringBox.getValue());
console.log("大文字に変換:", stringBox.getValue().toUpperCase());

// 値を更新してみる
stringBox.setValue("Updated Value");
console.log("更新後の値:", stringBox.getValue());

// 2. 数値を格納するボックス
const numberBox = new GenericBox<number>(123.456);
console.log("\n数値ボックスの値:", numberBox.getValue());
console.log("小数点以下2桁に丸める:", numberBox.getValue().toFixed(2));

// 3. オブジェクトを格納するボックス
interface Product {
  id: number;
  name: string;
  price: number;
}

const productBox = new GenericBox<Product>({
  id: 101,
  name: "TypeScript Book",
  price: 2500,
});

const product = productBox.getValue();
console.log("\n商品ボックスの値:", product);
console.log(`商品名: ${product.name}, 価格: ${product.price}円`);

// 4. 型パラメータを省略した場合（型推論を利用）
const inferredBox = new GenericBox([1, 2, 3, 4, 5]);
const numbers = inferredBox.getValue();
console.log("\n型推論を使ったボックス:", numbers);
const sum = numbers.reduce((total, n) => total + n, 0);
console.log("合計値:", sum);

// 5. toString()メソッドの使用
console.log("\ntoString()メソッドの使用:");
console.log(stringBox.toString());
console.log(numberBox.toString());
console.log(productBox.toString());
