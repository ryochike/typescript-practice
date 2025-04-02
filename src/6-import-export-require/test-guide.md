# テストの書き方ガイド：Vitest と Node.js assert

このガイドでは、TypeScriptで作成したモジュールをテストするための2つの方法について紹介します：

1. **Node.js標準の`assert`モジュール** - 外部依存のない基本的なテスト
2. **Vitest** - TypeScript用のモダンなテストフレームワーク

## テストの重要性

単体テストを書くことで得られるメリット：

- バグの早期発見
- コードの品質向上
- リファクタリングの安全性確保
- コードの仕様を明確化
- 再利用可能な部品の信頼性確保

## 課題の概要

`mathUtil.ts`に実装した数学関数をテストするために、以下の2種類のテストファイルを作成してください：

1. **mathUtil.test.ts** - Vitestを使ったテスト
2. **mathUtil.assert.test.cjs** - Node.jsのassertモジュールを使ったテスト

各テストファイルのテンプレートは用意してありますが、実際のテストケースは自分で考える必要があります。

## テストケース設計のポイント

良いテストを書くために考慮すべき点：

### 1. 通常の入力（正常系）

例えば、`add(2, 3)`は`5`を返すはずです。

### 2. 特殊なケース（境界値）

- 0との演算
- 負の数との演算
- 小数点の計算

### 3. エラーケース（異常系）

例えば、`divide(10, 0)`は例外をスローするはずです。

## テストフレームワークの比較

### Node.js assert

```javascript
// 基本的な検証
assert.strictEqual(add(2, 3), 5);

// 例外の検証
assert.throws(() => divide(10, 0), /エラーメッセージ/);

// オブジェクトの比較
assert.deepStrictEqual({a: 1}, {a: 1});

// 小数点の比較
assert(Math.abs(result - 0.3) < 0.0001);
```

### Vitest

```typescript
// 基本的な検証
expect(add(2, 3)).toBe(5);

// 例外の検証
expect(() => divide(10, 0)).toThrow();

// オブジェクトの比較
expect({a: 1}).toEqual({a: 1});

// 小数点の比較
expect(add(0.1, 0.2)).toBeCloseTo(0.3);
```

## 実行方法

### Vitestテストの実行

```bash
npm test src/6-import-export-require/utils/mathUtil.test.ts
```

### Node.js assertテストの実行

```bash
# まずTypeScriptファイルをコンパイル
npm run build

# テスト実行
node src/6-import-export-require/utils/mathUtil.assert.test.cjs
```

注意: Node.jsのassertテストでは、コンパイル後のJavaScriptファイルをテストします。
コンパイルされたファイルは `dist/src/6-import-export-require/utils/mathUtil.js` に生成されます。

## 課題

1. `mathUtil.test.ts`と`mathUtil.assert.test.cjs`の両方にテストケースを追加してください
2. 各関数（add, multiply, divide, subtract）とデフォルトエクスポートについてテストを書いてください
3. 正常系、境界値、エラーケースをカバーするようにしてください

テストは自分で設計することが重要です。どんなケースをテストすべきか考え、網羅的なテストスイートを作成してください。

## ヒント

- テストケースを自分で考えて実装することで、テスト設計スキルが身につきます
- テストケースの設計はソフトウェア開発の重要なスキルです
