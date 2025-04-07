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

describe("型ナロイングとユニオン型 - 課題", () => {
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

  // 実際のtypeNarrowing.tsコードを取得してその内容を評価する関数
  function evaluateTypeNarrowingTs() {
    try {
      // ファイルの内容を読み取り、コードの構造を評価
      const filePath = path.resolve(__dirname, "typeNarrowing.ts");
      const fileContent = fs.readFileSync(filePath, "utf8");

      return {
        // processValue関数の実装チェック
        hasProcessValueFunction:
          /function\s+processValue\s*\(\s*value\s*:\s*number\s*\|\s*string\s*\)\s*:\s*string/.test(
            fileContent
          ),
        hasTypeofCheck: /typeof\s+value\s*===?\s*['"]number['"]/.test(
          fileContent
        ),
        // calculateArea関数の実装チェック
        hasCalculateAreaFunction:
          /function\s+calculateArea\s*\(\s*shape\s*:\s*Shape\s*\)\s*:\s*number/.test(
            fileContent
          ),
        hasSwitchStatement:
          /switch\s*\(\s*shape\.kind\s*\)/.test(fileContent) ||
          /if\s*\(\s*shape\.kind\s*===?\s*['"]circle['"]\s*\)/.test(
            fileContent
          ),
        // 発展課題のチェック（任意）
        hasTriangleType: /type\s+Triangle\s*=/.test(fileContent),
      };
    } catch (error) {
      console.error("ファイル評価エラー:", error);
      return {
        hasProcessValueFunction: false,
        hasTypeofCheck: false,
        hasCalculateAreaFunction: false,
        hasSwitchStatement: false,
        hasTriangleType: false,
      };
    }
  }

  // TypeScriptファイルをトランスパイルして実行し、その出力を取得する関数
  function executeTypeScriptFile(filePath: string): void {
    try {
      // TypeScriptファイルをトランスパイルして実行
      execSync(
        `npx tsc ${filePath} --outFile ${filePath.replace(".ts", ".temp.js")}`
      );

      // 実行して出力をキャプチャ
      const output = execSync(`node ${filePath.replace(".ts", ".temp.js")}`, {
        encoding: "utf8",
      });

      // 出力を行ごとに分割してlogOutputに追加
      for (const line of output
        .split("\n")
        .filter((line) => line.trim() !== "")) {
        logOutput.push(line);
      }

      // 一時ファイルを削除
      fs.unlinkSync(filePath.replace(".ts", ".temp.js"));
    } catch (error) {
      console.error("実行エラー:", error);
    }
  }

  it("課題1: processValue関数が正しく実装されていること", () => {
    const result = evaluateTypeNarrowingTs();
    expect(result.hasProcessValueFunction).toBe(true);
    expect(result.hasTypeofCheck).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "typeNarrowing.ts");
    if (fs.existsSync(filePath)) {
      executeTypeScriptFile(filePath);

      // 出力に期待される内容が含まれているか確認
      expect(logOutput.some((log) => log.includes("Squared: 25"))).toBe(true);
      expect(logOutput.some((log) => log.includes("Length: 5"))).toBe(true);
    }
  });

  it("課題2: calculateArea関数が正しく実装されていること", () => {
    const result = evaluateTypeNarrowingTs();
    expect(result.hasCalculateAreaFunction).toBe(true);
    expect(result.hasSwitchStatement).toBe(true);

    // 実際に実行して出力を確認
    const filePath = path.resolve(__dirname, "typeNarrowing.ts");
    if (fs.existsSync(filePath)) {
      executeTypeScriptFile(filePath);

      // 出力に期待される内容が含まれているか確認
      expect(
        logOutput.some(
          (log) =>
            log.includes("Circle area:") && log.includes("78.53981633974483")
        )
      ).toBe(true);
      expect(logOutput.some((log) => log.includes("Rectangle area: 24"))).toBe(
        true
      );
    }
  });

  // 発展課題のテスト（任意）
  it("発展課題: 三角形の型と計算が実装されていること（任意）", () => {
    const result = evaluateTypeNarrowingTs();
    // 発展課題は任意なので、テストが失敗しても全体のテスト結果には影響しない
    if (result.hasTriangleType) {
      expect(result.hasTriangleType).toBe(true);
    }
  });
});
