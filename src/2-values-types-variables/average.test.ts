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

describe("配列と基本演算 - 課題", () => {
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

  // 実際のaverage.tsコードを取得してその内容を評価する関数
  function evaluateAverageTs() {
    try {
      // ファイルの内容を読み取り、コードの構造を評価
      const filePath = path.resolve(__dirname, "average.ts");
      const fileContent = fs.readFileSync(filePath, "utf8");

      return {
        hasGetAverageFunction:
          /function\s+getAverage\s*\(\s*values\s*:\s*number\[\]\s*\)\s*:\s*number\s*\{/.test(
            fileContent,
          ),
        hasErrorHandling: /if\s*\(\s*values\.length\s*===\s*0\s*\)/.test(
          fileContent,
        ),
        hasReduceMethod: /\.reduce\s*\(/.test(fileContent),
        hasTestCode: /console\.log\s*\([^)]*getAverage\s*\(/.test(fileContent),
        hasTryCatch: /try\s*\{[^}]*\}\s*catch\s*\(/.test(fileContent),
        // 発展課題のチェック（任意）
        hasStringFunction:
          /function\s+getAverageStringLength\s*\(\s*strings\s*:\s*string\[\]\s*\)/.test(
            fileContent,
          ),
        hasMedianFunction:
          /function\s+getMedian\s*\(\s*values\s*:\s*number\[\]\s*\)/.test(
            fileContent,
          ),
      };
    } catch (error) {
      console.error("ファイル評価エラー:", error);
      return {
        hasGetAverageFunction: false,
        hasErrorHandling: false,
        hasReduceMethod: false,
        hasTestCode: false,
        hasTryCatch: false,
        hasStringFunction: false,
        hasMedianFunction: false,
      };
    }
  }

  it("課題1: 数値配列の平均値を計算する関数が実装されていること", () => {
    const result = evaluateAverageTs();
    expect(result.hasGetAverageFunction).toBe(true);
    expect(result.hasReduceMethod).toBe(true);
  });

  it("課題2: 空配列の場合のエラーハンドリングが実装されていること", () => {
    const result = evaluateAverageTs();
    expect(result.hasErrorHandling).toBe(true);
  });

  it("課題3: 関数のテストコードが実装されていること", () => {
    const result = evaluateAverageTs();
    expect(result.hasTestCode).toBe(true);
    expect(result.hasTryCatch).toBe(true);
  });

  // 任意の発展課題に関するテスト
  it("発展課題1: 文字列配列の平均長を計算する関数が実装されていること（任意）", () => {
    const result = evaluateAverageTs();
    // 発展課題は任意なので、存在する場合のみテスト
    if (result.hasStringFunction) {
      expect(result.hasStringFunction).toBe(true);
    }
  });

  it("発展課題2: 中央値を計算する関数が実装されていること（任意）", () => {
    const result = evaluateAverageTs();
    // 発展課題は任意なので、存在する場合のみテスト
    if (result.hasMedianFunction) {
      expect(result.hasMedianFunction).toBe(true);
    }
  });
});
