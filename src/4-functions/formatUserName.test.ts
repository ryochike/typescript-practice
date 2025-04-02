import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("関数のオプション引数とデフォルト値 - 課題", () => {
  // console.logのモック化
  let consoleLogSpy: MockInstance;
  let originalConsoleLog: typeof console.log;
  let logOutput: string[] = [];

  beforeEach(() => {
    // テスト前にconsole.logをモック化
    originalConsoleLog = console.log;
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation((message) => {
      logOutput.push(String(message));
    });
  });

  afterEach(() => {
    // テスト後にモックをリセット
    consoleLogSpy.mockRestore();
    console.log = originalConsoleLog;
    logOutput = [];
  });

  // 実際のformatUserName.tsコードを取得してその内容を評価する関数
  function evaluateFormatUserNameTs() {
    try {
      // ファイルの内容を読み取り、コードの構造を評価
      const filePath = path.resolve(__dirname, "formatUserName.ts");
      const fileContent = fs.readFileSync(filePath, "utf8");

      return {
        // formatUserName関数の実装チェック
        hasFormatUserNameFunction:
          /function\s+formatUserName\s*\(\s*name\s*:\s*string\s*,\s*role\s*\?\s*:\s*string\s*\)\s*:\s*string/.test(
            fileContent,
          ),
        hasRoleCheck: /if\s*\(\s*role\s*\)/.test(fileContent),

        // formatUserNameWithDefault関数の実装チェック
        hasFormatUserNameWithDefaultFunction:
          /function\s+formatUserNameWithDefault\s*\(\s*name\s*:\s*string\s*,\s*role\s*=\s*["']Guest["']\s*\)\s*:\s*string/.test(
            fileContent,
          ),

        // formatUserNameCombined関数の実装チェック（発展課題）
        hasFormatUserNameCombinedFunction:
          /function\s+formatUserNameCombined\s*\(\s*name\s*:\s*string\s*,\s*role\s*\?\s*:\s*string\s*,\s*prefix\s*=\s*["']User:["']\s*\)\s*:\s*string/.test(
            fileContent,
          ),

        // 考察チェック（任意）
        hasConsideration:
          /オプション引数.*デフォルト値の違い/.test(fileContent) &&
          (fileContent.match(/オプション引数.*:/)?.length ?? 0) > 0 &&
          (fileContent.match(/デフォルト値.*:/)?.length ?? 0) > 0 &&
          (fileContent.match(/純粋関数.*メリット/)?.length ?? 0) > 0,
      };
    } catch (error) {
      console.error("ファイル評価エラー:", error);
      return {
        hasFormatUserNameFunction: false,
        hasRoleCheck: false,
        hasFormatUserNameWithDefaultFunction: false,
        hasFormatUserNameCombinedFunction: false,
        hasConsideration: false,
      };
    }
  }

  // TypeScriptファイルをトランスパイルして実行し、その出力を取得する関数
  function executeTypeScriptFile(filePath: string): void {
    try {
      // TypeScriptファイルをトランスパイルして実行
      execSync(
        `npx tsc ${filePath} --outFile ${filePath.replace(".ts", ".temp.js")}`,
      );
      execSync(`node ${filePath.replace(".ts", ".temp.js")}`, {
        encoding: "utf8",
      });

      // 一時ファイルを削除
      fs.unlinkSync(filePath.replace(".ts", ".temp.js"));
    } catch (error) {
      console.error("実行エラー:", error);
    }
  }

  it("課題1: formatUserName関数が正しく実装されていること", () => {
    const result = evaluateFormatUserNameTs();
    expect(result.hasFormatUserNameFunction).toBe(true);
    expect(result.hasRoleCheck).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "formatUserName.ts");
    if (fs.existsSync(filePath)) {
      executeTypeScriptFile(filePath);

      // 出力に期待される内容が含まれているか確認
      expect(logOutput.some((log) => log === "Alice")).toBe(true);
      expect(logOutput.some((log) => log === "Bob (Designer)")).toBe(true);
    }
  });

  it("課題2: formatUserNameWithDefault関数が正しく実装されていること", () => {
    const result = evaluateFormatUserNameTs();
    expect(result.hasFormatUserNameWithDefaultFunction).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "formatUserName.ts");
    if (fs.existsSync(filePath)) {
      executeTypeScriptFile(filePath);

      // 出力に期待される内容が含まれているか確認
      expect(logOutput.some((log) => log === "Charlie (Guest)")).toBe(true);
      expect(logOutput.some((log) => log === "Dave (Admin)")).toBe(true);
    }
  });

  it("課題3: formatUserNameCombined関数が正しく実装されていること（発展課題）", () => {
    const result = evaluateFormatUserNameTs();
    expect(result.hasFormatUserNameCombinedFunction).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "formatUserName.ts");
    if (fs.existsSync(filePath)) {
      executeTypeScriptFile(filePath);

      // 出力に期待される内容が含まれているか確認
      expect(logOutput.some((log) => log === "User: Eve")).toBe(true);
      expect(logOutput.some((log) => log === "User: Frank (Developer)")).toBe(
        true,
      );
      expect(logOutput.some((log) => log === "Employee: Grace (Manager)")).toBe(
        true,
      );
    }
  });

  // 考察チェック（任意）
  it("考察: オプション引数とデフォルト値の違い、純粋関数のメリットについて考察されていること（任意）", () => {
    const result = evaluateFormatUserNameTs();
    // 考察は任意なので、テストが失敗しても全体のテスト結果には影響しない
    if (result.hasConsideration) {
      expect(result.hasConsideration).toBe(true);
    }
  });
});
