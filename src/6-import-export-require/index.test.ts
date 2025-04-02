import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("モジュールインポート課題のテスト", () => {
  // コンソール出力をキャプチャするための準備
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let logOutput: string[] = [];

  beforeEach(() => {
    // コンソール出力をキャプチャ
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation((message) => {
      logOutput.push(String(message));
    });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    logOutput = [];
  });

  function executeFile(filePath: string): string[] {
    try {
      // TypeScriptファイルをコンパイルして実行
      const tempJsPath = path.resolve(
        path.dirname(filePath),
        `.temp.${path.basename(filePath, ".ts")}.js`,
      );
      execSync(`npx tsc ${filePath} --outFile ${tempJsPath}`, {
        stdio: "pipe",
      });

      // コンパイルされたJSファイルを読み込んで実行
      const output = execSync(`node ${tempJsPath}`, { encoding: "utf-8" });

      // 一時ファイルを削除
      fs.unlinkSync(tempJsPath);

      return output.split("\n").filter((line) => line.trim() !== "");
    } catch (error) {
      console.error("ファイル実行エラー:", error);
      return [];
    }
  }

  function readSourceFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error("ファイル読み込みエラー:", error);
      return "";
    }
  }

  it("課題1: index.tsファイルに必要なインポート文が含まれていること", () => {
    const filePath = path.resolve(__dirname, "index.ts");
    const sourceCode = readSourceFile(filePath);

    // 名前付きインポート
    expect(sourceCode).toMatch(
      /import\s*{\s*add\s*,\s*multiply\s*}\s*from\s*['"]\./,
    );

    // 別名でのインポート
    expect(sourceCode).toMatch(
      /import\s*{\s*(?:divide\s+as\s+safeDiv|subtract\s+as\s+minus).*,\s*(?:divide\s+as\s+safeDiv|subtract\s+as\s+minus).*}\s*from\s*['"]\./,
    );

    // デフォルトインポート
    expect(sourceCode).toMatch(/import\s+(\w+)\s+from\s*['"]\./);

    // 名前空間インポート
    expect(sourceCode).toMatch(/import\s*\*\s*as\s*math\s*from\s*['"]\./);
  });

  it("課題2: index.tsの実行結果が正しいこと", () => {
    const filePath = path.resolve(__dirname, "index.ts");
    const output = executeFile(filePath);

    // 必要な出力が含まれているか確認
    expect(output.some((line) => line.includes("名前付きインポート"))).toBe(
      true,
    );
    expect(
      output.some((line) => line.includes("2 + 3 =") && line.includes("5")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("4 × 6 =") && line.includes("24")),
    ).toBe(true);

    expect(output.some((line) => line.includes("別名でインポート"))).toBe(true);
    expect(
      output.some((line) => line.includes("10 ÷ 2 =") && line.includes("5")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("7 - 3 =") && line.includes("4")),
    ).toBe(true);

    expect(output.some((line) => line.includes("デフォルトインポート"))).toBe(
      true,
    );
    expect(
      output.some((line) => line.includes("5 + 5 =") && line.includes("10")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("8 × 3 =") && line.includes("24")),
    ).toBe(true);

    expect(
      output.some((line) => line.includes("名前空間としてインポート")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("9 ÷ 3 =") && line.includes("3")),
    ).toBe(true);
    expect(
      output.some((line) => line.includes("10 - 5 =") && line.includes("5")),
    ).toBe(true);

    expect(output.some((line) => line.includes("エラーハンドリング"))).toBe(
      true,
    );
    expect(
      output.some(
        (line) => line.includes("エラーが発生") && line.includes("0で除算"),
      ),
    ).toBe(true);
  });

  it("課題3: try-catchによるエラーハンドリングが実装されていること", () => {
    const filePath = path.resolve(__dirname, "index.ts");
    const sourceCode = readSourceFile(filePath);

    // try-catchブロックが実装されていることを確認
    expect(sourceCode).toMatch(/try\s*{[^}]*divide\s*\([^,]*,\s*0\s*\)/);
    expect(sourceCode).toMatch(
      /catch\s*\(\s*\w+\s*\)\s*{[^}]*console\.(error|log)/,
    );
  });
});
