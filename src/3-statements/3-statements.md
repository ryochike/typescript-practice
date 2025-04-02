# 3. 文（制御構文）

このセクションでは、TypeScript の条件分岐や繰り返し処理などの **制御構文** について学びます。  
特に **ユニオン型** と **型ナロイング**（型の絞り込み）に焦点を当て、次のトピックを扱います。

- `if` / `switch` / `typeof` 等を使った制御構文
- ユニオン型 (`number | string` など)
- 判別可能なユニオン型（Discriminated Union）
- 型ナロイングの様々な手法（`typeof`, `instanceof`, `in`, ユーザー定義型ガード など）

## 3-1. ユニオン型と型ナロイング

### 概要

- **ユニオン型（複数の型をとり得る）** を受け取る関数を実装し、**型に応じて** 異なる処理を行う課題です。
- TypeScript の **型システム** を活用し、`if` 文や `typeof` 演算子による **型ナロイング** を体験します。
- さらに、**判別可能なユニオン型**（discriminated union）や **switch 文** を活用することで、**より安全な分岐処理**を学びます。

### 目的・ゴール

1. **ユニオン型** (`number | string` など) を使い、分岐処理を実装できる
2. **型ナロイング**（型の絞り込み）の仕組みを理解し、コードに適用できる
3. **判別可能なユニオン型**（discriminated union）と **switch 文** の組み合わせを使った効率的な実装を学ぶ
4. **type predicate**（ユーザー定義型ガード）や `instanceof`, `in` といったナロイング手法を試し、TypeScript の表現力をさらに深く体験する

### 手順

1. `src/3-statements/typeNarrowing.ts` ファイルを開いてください。
2. 段階的に課題に取り組み、コードを完成させます。
3. 以下の各課題を順に実装してください：

#### 課題1: 基本的なユニオン型の分岐（`if` / `typeof`）

**内容**  

- 引数 `value` は `number | string` を受け取るユニオン型です。  
- `value` の型が数値なら、平方値（ `value * value` ）を計算して `"Squared: 25"` のような文字列を返す。  
- 文字列なら、その文字列の長さを計算して `"Length: 5"` のように返す。  

**テンプレートコード例**:

```ts
/*
課題1: number か string を受け取り、型によって処理を分岐する関数を実装してください
- 数値の場合: 平方値を計算して "Squared: 数値" という形式で返す
- 文字列の場合: 文字列の長さを計算して "Length: 長さ" という形式で返す
*/
function processValue(value: number | string): string {
  // ここにコードを実装（if文やtypeofを使った型ナロイング）してください

  return ""; // TODO: 実装を置き換える
}

// テスト
console.log(processValue(5));        // "Squared: 25" が期待値
console.log(processValue("Hello"));  // "Length: 5" が期待値
```

**ヒント**  

- `typeof value === "number"` という判定でブロック内の型を絞り込めます。

#### 課題2: 判別可能なユニオン型 + switch

**内容**  

- 次に、**判別可能なユニオン型（discriminated union）** を使ってみましょう。  
- 以下の `Shape` 型は、`kind` プロパティで "circle" または "rectangle" を区別します。  

```ts
// 円を表す型
type Circle = {
  kind: "circle";
  radius: number;
};

// 長方形を表す型
type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

// Shape型（CircleまたはRectangle）
type Shape = Circle | Rectangle;
```

**課題**  

- `calculateArea(shape: Shape): number` 関数を実装し、**図形の面積** を返してください。  
  - Circle: π × (radius²)  
  - Rectangle: width × height  

**テンプレートコード例**:

```ts
/*
課題2: 判別可能なユニオン型（Discriminated Union）を使用します
     : shape.kind を見て面積を計算する関数を実装してください
*/
function calculateArea(shape: Shape): number {
  // switch文やif文を使って、shape.kindごとに型を絞り込み、面積を計算
  // switch文の場合、defaultケースで never 型を使った "exhaustive check" の例も試せます

  return 0; // TODO: 適切な実装に置き換えてください
}

// テスト用オブジェクト
const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

// テスト
console.log(`Circle area: ${calculateArea(circle)}`);       // 78.5398... が期待値
console.log(`Rectangle area: ${calculateArea(rectangle)}`); // 24 が期待値
```

**ヒント**  

- `switch (shape.kind)` でブロックを分岐させると、TypeScript が自動的に `radius` や `width` を安全に扱えるようになります。  
- `default` ケースで `const neverValue: never = shape;` と書いて、**exhaustive check** を試すことも可能です。  
- 例えば:

  ```ts
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // ここに来るならShapeの型定義に漏れがあるはず → コンパイル時エラーにできる
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
  ```

4. **コードをトランスパイルして実行**  

   ```bash
   # プロジェクトのトランスパイル
   npm run build

   # 実行
   node dist/3-statements/typeNarrowing.js
   ```

5. **テストを実行し、正しく実装できているか確認**

   ```bash
   npm run test -- src/3-statements/typeNarrowing.test.ts
   ```

### チェックポイント

- **`typeof` 演算子** で型チェックを行うと、その条件ブロック内で型が自動的に絞り込まれることを理解できたか
- **switch 文** + **判別可能なユニオン型（`kind`）** で安全な分岐が書けるか
- **exhaustive check**（`never`）を活用して、実装漏れをコンパイルエラーで防ぐ方法を学べたか
- TypeScriptの型システムがどのように制御フローと連携するかを理解できたか

### 発展課題（任意）

1. **課題3: 型ナロイングの他の手法を試す**
   - **`instanceof` 演算子**  
     - JavaScript のクラスやコンストラクタ関数を使ったオブジェクトの型判定に利用できます。
   - **`in` 演算子**  
     - オブジェクトに特定プロパティが存在するかどうかで型を絞り込めます。
   - **ユーザー定義型ガード（type predicate）**  
     - 例:

       ```ts
       function isCircle(shape: Shape): shape is Circle {
         return shape.kind === "circle";
       }

       // 使い方
       if (isCircle(shape)) {
         // ここで shape は Circle 型に絞り込まれる
       }
       ```

     - 関数の戻り値に `shape is Circle` のように書くことで、呼び出し元の `if` ブロック内で型が絞り込まれます。

2. **図形の種類を追加**  
   - 新たに三角形（`{ kind: "triangle", base: number, height: number }`）を追加し、計算ロジックを拡張してみましょう。
   - `calculateArea` 関数で「漏れがないか」を **exhaustive check** で確認すると、型の利点がより実感できます。

---

## 参考情報

- [TypeScript: Narrowing (Official Docs)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)  
- [TypeScript: Discriminated Unions (Official Docs)](https://www.typescriptlang.org/docs/handbook/2/narrowed-types.html#discriminated-unions)

**次のセクション：オプション引数とデフォルト値 (関数の章)**  

- この課題では基本的にオプション引数は使いませんが、次の「関数」セクションでは `function greet(name: string = "User") { ... }` など、引数のデフォルト値やオプション引数について詳しく学びます。先々の課題とあわせて、ぜひ知識をつなげてください。
