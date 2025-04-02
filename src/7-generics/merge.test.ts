import { merge } from "./merge";

describe("merge関数のテスト", () => {
  // 基本的なマージ操作のテスト
  test("2つの単純なオブジェクトをマージできる", () => {
    const objA = { a: 1, b: 2 };
    const objB = { c: 3, d: 4 };

    const result = merge(objA, objB);

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  // オブジェクトのプロパティ重複時のテスト
  test("重複するプロパティがある場合、第2引数の値が優先される", () => {
    const objA = { a: 1, b: 2, common: "A" };
    const objB = { c: 3, common: "B" };

    const result = merge(objA, objB);

    expect(result).toEqual({ a: 1, b: 2, c: 3, common: "B" });
  });

  // 複雑なオブジェクト型のテスト
  test("複雑なオブジェクト型も正しくマージされる", () => {
    interface Product {
      id: number;
      name: string;
    }

    interface StockInfo {
      inStock: boolean;
      quantity: number;
    }

    const product: Product = {
      id: 1,
      name: "TypeScript Book",
    };

    const stockInfo: StockInfo = {
      inStock: true,
      quantity: 100,
    };

    const result = merge(product, stockInfo);

    // マージされたオブジェクトが全てのプロパティを持つことを検証
    expect(result).toEqual({
      id: 1,
      name: "TypeScript Book",
      inStock: true,
      quantity: 100,
    });

    // 型安全性の検証（コンパイル時）
    expect(result.id).toBe(1);
    expect(result.name).toBe("TypeScript Book");
    expect(result.inStock).toBe(true);
    expect(result.quantity).toBe(100);
  });

  // 一方が空オブジェクトの場合のテスト
  test("一方が空オブジェクトの場合、もう一方のオブジェクトがそのまま返る", () => {
    const objA = { a: 1, b: 2 };
    const emptyObj = {};

    expect(merge(objA, emptyObj)).toEqual(objA);
    expect(merge(emptyObj, objA)).toEqual(objA);
  });

  // 元のオブジェクトが変更されないことを確認
  test("元のオブジェクトは変更されない（不変性を保つ）", () => {
    const objA = { a: 1, b: 2 };
    const objB = { c: 3 };

    const original1 = { ...objA };
    const original2 = { ...objB };

    merge(objA, objB);

    expect(objA).toEqual(original1);
    expect(objB).toEqual(original2);
  });
});
