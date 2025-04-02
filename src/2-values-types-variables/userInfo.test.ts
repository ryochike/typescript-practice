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

describe("ユーザー情報の型と実装 - 課題", () => {
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

  // 実際のuserInfo.tsコードを取得してその内容を評価する関数
  function evaluateUserInfoTs() {
    try {
      // ファイルの内容を読み取り、コードの構造を評価
      const filePath = path.resolve(__dirname, "userInfo.ts");
      const fileContent = fs.readFileSync(filePath, "utf8");

      return {
        hasUserType:
          /type\s+User\s*=\s*\{[^}]*name\s*:\s*string[^}]*age\s*:\s*number[^}]*isPremium\s*:\s*boolean[^}]*\}/.test(
            fileContent,
          ),
        hasUserObject:
          /const\s+userA\s*:\s*User\s*=\s*\{[^}]*name\s*:[^}]*age\s*:[^}]*isPremium\s*:[^}]*\}/.test(
            fileContent,
          ),
        hasPrintFunction:
          /function\s+printUserInfo\s*\(\s*user\s*:\s*User\s*\)\s*:\s*void\s*\{/.test(
            fileContent,
          ),
        hasFunctionCall: /printUserInfo\s*\(\s*userA\s*\)/.test(fileContent),
        // 発展課題のチェック（任意）
        hasExtendedUserType:
          /type\s+ExtendedUser\s*=\s*\{[^}]*role\s*\?\s*:\s*string[^}]*\}/.test(
            fileContent,
          ),
      };
    } catch (error) {
      console.error("ファイル評価エラー:", error);
      return {
        hasUserType: false,
        hasUserObject: false,
        hasPrintFunction: false,
        hasFunctionCall: false,
        hasExtendedUserType: false,
      };
    }
  }

  // TypeScriptファイルをトランスパイルして実行し、その出力を取得する関数
  function executeTypeScriptFile(filePath: string): string {
    try {
      // TypeScriptファイルを一時的にJavaScriptにトランスパイル
      execSync(
        `npx tsc ${filePath} --outFile ${filePath.replace(".ts", ".temp.js")}`,
      );

      // 生成されたJavaScriptを実行して出力を取得
      const output = execSync(`node ${filePath.replace(".ts", ".temp.js")}`, {
        encoding: "utf8",
      });

      // 一時ファイルを削除
      fs.unlinkSync(filePath.replace(".ts", ".temp.js"));

      return output;
    } catch (error) {
      console.error("実行エラー:", error);
      return "";
    }
  }

  it("課題1: User型が正しく定義されていること", () => {
    const result = evaluateUserInfoTs();
    expect(result.hasUserType).toBe(true);
  });

  it("課題2: User型を使ったオブジェクトが作成されていること", () => {
    const result = evaluateUserInfoTs();
    expect(result.hasUserObject).toBe(true);
  });

  it("課題3: ユーザー情報を出力する関数が実装されていること", () => {
    const result = evaluateUserInfoTs();
    expect(result.hasPrintFunction).toBe(true);
  });

  it("課題4: 関数が正しく呼び出され、出力されていること", () => {
    const result = evaluateUserInfoTs();
    expect(result.hasFunctionCall).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "userInfo.ts");
    if (fs.existsSync(filePath)) {
      // execSyncを使って直接実行し、出力をチェック
      try {
        // トランスパイル
        execSync(
          `npx tsc ${filePath} --outFile ${filePath.replace(".ts", ".temp.js")}`,
        );

        // 実行
        const output = execSync(`node ${filePath.replace(".ts", ".temp.js")}`, {
          encoding: "utf8",
        });

        // 一時ファイルを削除
        fs.unlinkSync(filePath.replace(".ts", ".temp.js"));

        // 出力に必要な情報が含まれているか確認
        expect(output.includes("歳") && output.includes("Premium")).toBe(true);
      } catch (error) {
        console.error("課題4のテスト実行エラー:", error);
        expect(false).toBe(true); // テスト失敗
      }
    }
  });

  // 発展課題のテスト（任意）
  it("発展課題: オプショナルプロパティを持つ型が定義されていること（任意）", () => {
    const result = evaluateUserInfoTs();
    // 発展課題は任意なので、テストが失敗しても全体のテスト結果には影響しない
    if (result.hasExtendedUserType) {
      expect(result.hasExtendedUserType).toBe(true);
    }
  });
});
