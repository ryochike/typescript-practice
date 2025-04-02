import { getElement } from "./getElement";

describe("getElement関数のテスト", () => {
  // 数値配列のテスト
  describe("数値配列", () => {
    const numArray = [10, 20, 30, 40, 50];

    test("有効なインデックスで要素を取得できる", () => {
      expect(getElement(numArray, 0)).toBe(10);
      expect(getElement(numArray, 2)).toBe(30);
      expect(getElement(numArray, 4)).toBe(50);
    });

    test("範囲外のインデックスではundefinedを返す", () => {
      expect(getElement(numArray, -1)).toBeUndefined();
      expect(getElement(numArray, 5)).toBeUndefined();
      expect(getElement(numArray, 99)).toBeUndefined();
    });
  });

  // 文字列配列のテスト
  describe("文字列配列", () => {
    const strArray = ["apple", "banana", "cherry"];

    test("有効なインデックスで要素を取得できる", () => {
      expect(getElement(strArray, 0)).toBe("apple");
      expect(getElement(strArray, 1)).toBe("banana");
      expect(getElement(strArray, 2)).toBe("cherry");
    });

    test("範囲外のインデックスではundefinedを返す", () => {
      expect(getElement(strArray, 3)).toBeUndefined();
    });
  });

  // オブジェクト配列のテスト
  describe("オブジェクト配列", () => {
    interface User {
      id: number;
      name: string;
    }

    const users: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    test("有効なインデックスでオブジェクトを取得できる", () => {
      expect(getElement(users, 0)).toEqual({ id: 1, name: "Alice" });
      expect(getElement(users, 1)).toEqual({ id: 2, name: "Bob" });
    });

    test("取得したオブジェクトのプロパティにアクセスできる", () => {
      const user = getElement(users, 0);
      expect(user?.id).toBe(1);
      expect(user?.name).toBe("Alice");
    });
  });
});
