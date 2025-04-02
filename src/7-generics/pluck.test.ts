import { pluck } from "./pluck";

describe("pluck関数のテスト", () => {
  // ベーシックな動作テスト
  describe("基本機能", () => {
    interface TestUser {
      id: number;
      name: string;
      age: number;
    }

    const users: TestUser[] = [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ];

    test("数値プロパティを抽出できる", () => {
      const ids = pluck(users, "id");
      expect(ids).toEqual([1, 2, 3]);

      const ages = pluck(users, "age");
      expect(ages).toEqual([25, 30, 35]);
    });

    test("文字列プロパティを抽出できる", () => {
      const names = pluck(users, "name");
      expect(names).toEqual(["Alice", "Bob", "Charlie"]);
    });

    test("空の配列に対しても動作する", () => {
      const emptyArray: TestUser[] = [];
      expect(pluck(emptyArray, "id")).toEqual([]);
      expect(pluck(emptyArray, "name")).toEqual([]);
    });
  });

  // 複雑なオブジェクトとネストしたプロパティのテスト
  describe("複雑なオブジェクト", () => {
    interface Address {
      city: string;
      zipCode: string;
    }

    interface ComplexUser {
      id: number;
      info: {
        name: string;
        email: string;
      };
      address: Address;
      tags: string[];
    }

    const complexUsers: ComplexUser[] = [
      {
        id: 1,
        info: { name: "Alice", email: "alice@example.com" },
        address: { city: "Tokyo", zipCode: "100-0001" },
        tags: ["admin", "active"],
      },
      {
        id: 2,
        info: { name: "Bob", email: "bob@example.com" },
        address: { city: "Osaka", zipCode: "530-0001" },
        tags: ["user", "active"],
      },
    ];

    test("複雑なオブジェクトからプロパティを抽出できる", () => {
      const ids = pluck(complexUsers, "id");
      expect(ids).toEqual([1, 2]);

      const infos = pluck(complexUsers, "info");
      expect(infos).toEqual([
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
      ]);

      const addresses = pluck(complexUsers, "address");
      expect(addresses).toEqual([
        { city: "Tokyo", zipCode: "100-0001" },
        { city: "Osaka", zipCode: "530-0001" },
      ]);

      const tags = pluck(complexUsers, "tags");
      expect(tags).toEqual([
        ["admin", "active"],
        ["user", "active"],
      ]);
    });
  });

  // 型安全性のテスト（コンパイル時にチェックされる）
  describe("型安全性", () => {
    interface TypedObject {
      numValue: number;
      strValue: string;
      boolValue: boolean;
    }

    const typedArray: TypedObject[] = [
      { numValue: 1, strValue: "one", boolValue: true },
      { numValue: 2, strValue: "two", boolValue: false },
    ];

    test("抽出されたプロパティは正しい型を保持している", () => {
      const numbers = pluck(typedArray, "numValue");
      const strings = pluck(typedArray, "strValue");
      const booleans = pluck(typedArray, "boolValue");

      // 数値型の検証
      expect(typeof numbers[0]).toBe("number");

      // 文字列型の検証
      expect(typeof strings[0]).toBe("string");

      // 真偽値型の検証
      expect(typeof booleans[0]).toBe("boolean");
    });
  });
});
