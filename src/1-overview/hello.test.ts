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

describe("Hello TypeScript - 課題", () => {
  // console.logのモック化
  let consoleLogSpy: MockInstance;
  let originalConsoleLog: typeof console.log;
  let logOutput: string[] = [];

  beforeEach(() => {
    // テスト前にconsole.logをモック化
    originalConsoleLog = console.log;
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation((message) => {
      logOutput.push(message);
    });
  });

  afterEach(() => {
    // テスト後にモックをリセット
    consoleLogSpy.mockRestore();
    console.log = originalConsoleLog;
    logOutput = [];
  });

  // 実際のhello.tsコードを取得してその内容を評価する関数
  function evaluateHelloTs() {
    try {
      // ESモジュールを動的にインポートできないので、ファイルの内容を評価して変数の有無をチェック
      const filePath = path.resolve(__dirname, "hello.ts");
      const fileContent = fs.readFileSync(filePath, "utf8");

      return {
        hasUserName: /const\s+userName\s*=/.test(fileContent),
        hasUserNameOutput: /console\.log\(.+userName.+\)/.test(fileContent),
        hasUserAge: /const\s+userAge\s*:\s*number/.test(fileContent),
        hasIsActive: /const\s+isActive\s*:\s*boolean/.test(fileContent),
        hasGreeting: /const\s+greeting\s*:\s*string/.test(fileContent),
        hasGreetingOutput: /console\.log\(greeting\)/.test(fileContent),
      };
    } catch (error) {
      console.error("ファイル評価エラー:", error);
      return {
        hasUserName: false,
        hasUserNameOutput: false,
        hasUserAge: false,
        hasIsActive: false,
        hasGreeting: false,
        hasGreetingOutput: false,
      };
    }
  }

  // TypeScriptファイルをトランスパイルして実行し、その出力を取得する関数
  function executeTypeScriptFile(filePath: string): string {
    try {
      // TypeScriptファイルを一時的にJavaScriptにトランスパイル
      const tempJsPath = filePath.replace(".ts", ".temp.js");
      execSync(`npx tsc ${filePath} --outFile ${tempJsPath}`);

      // 生成されたJavaScriptを実行して出力を取得
      const output = execSync(`node ${tempJsPath}`, { encoding: "utf8" });

      // 一時ファイルを削除
      fs.unlinkSync(tempJsPath);

      return output;
    } catch (error) {
      console.error("実行エラー:", error);
      return "";
    }
  }

  it("課題1: ユーザー名を宣言して挨拶を出力できること", () => {
    const result = evaluateHelloTs();

    expect(result.hasUserName).toBe(true);
    expect(result.hasUserNameOutput).toBe(true);

    // 実際の実行コードでコンソール出力が行われるかテスト
    const filePath = path.resolve(__dirname, "hello.ts");
    if (fs.existsSync(filePath)) {
      const output = executeTypeScriptFile(filePath);
      expect(output.includes("Hello")).toBe(true);
    }
  });

  it("課題2: 適切な型アノテーションで変数が宣言されていること", () => {
    const result = evaluateHelloTs();

    expect(result.hasUserAge).toBe(true);
    expect(result.hasIsActive).toBe(true);
    expect(result.hasGreeting).toBe(true);
  });

  it("課題4: greeting変数がコンソールに出力されていること", () => {
    const result = evaluateHelloTs();

    expect(result.hasGreetingOutput).toBe(true);

    // 実際の実行コードでgreetingがコンソール出力されるかテスト
    const filePath = path.resolve(__dirname, "hello.ts");
    if (fs.existsSync(filePath)) {
      const output = executeTypeScriptFile(filePath);
      expect(output.includes("歳です")).toBe(true);
    }
  });
});
