import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

describe("CommonJSモジュールインポート課題のテスト", () => {
  let sourceCode = "";
  let output: string[] = [];

  // テスト前にソースコードを読み込み、実行結果を取得
  beforeAll(() => {
    const filePath = path.resolve(__dirname, "./index_cjs.ts");
    sourceCode = fs.readFileSync(filePath, "utf8");

    try {
      // ファイルをコンパイルして実行
      const result = execSync(`npx ts-node ${filePath}`, { encoding: "utf8" });
      output = result.split("\n");
    } catch (error) {
      console.error("ファイルの実行中にエラーが発生しました:", error);
    }
  });

  it("課題1: index_cjs.tsファイルにrequire文が含まれていること", () => {
    // require文のパターンをチェック
    expect(sourceCode).toMatch(
      /const\s+.*\s*=\s*require\(['"]\.\/utils\/mathUtil['"]\)/,
    );
  });

  it("課題2: index_cjs.tsの実行結果が正しいこと", () => {
    // 出力には以下の結果が含まれているはず
    expect(
      output.some((line) => line.includes("2 + 3 =") && line.includes("5")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("4 × 6 =") && line.includes("24")),
    ).toBe(true);
  });

  it("課題3: try-catchによるエラーハンドリングが実装されていること", () => {
    // エラーハンドリングのコードが含まれているか
    expect(sourceCode).toMatch(/try\s*{[^}]*}\s*catch\s*\([^)]*\)\s*{/);

    // 0で割る処理が含まれているか
    expect(sourceCode).toMatch(/divide\([^,]+,\s*0\)/);

    // エラーメッセージを出力する処理が含まれているか
    expect(sourceCode).toMatch(/console\.error/);
  });
});
