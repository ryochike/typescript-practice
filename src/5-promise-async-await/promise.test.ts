import { afterEach, describe, expect, it, vi } from "vitest";
import * as fakeApi from "./fakeApi";

describe("Promiseと非同期処理に関するテスト", () => {
  // テスト後にモックをリセット
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 課題1: 非同期API関数のテスト
  describe("基本的なPromise関数のテスト", () => {
    it("fetchRandomNumberが数値を返すこと", async () => {
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
      const result = await fakeApi.fetchRandomNumber();
      expect(result).toBe(50);
      expect(randomSpy).toHaveBeenCalled();
    });

    it("fetchWithRandomErrorがエラーを投げる場合があること", async () => {
      // エラーが発生するパターンをテスト
      vi.spyOn(Math, "random").mockReturnValue(0.6);
      await expect(fakeApi.fetchWithRandomError()).rejects.toThrow(
        "ランダムエラーが発生しました",
      );
    });

    it("fetchWithRandomErrorが成功する場合があること", async () => {
      // 成功するパターンをテスト
      vi.spyOn(Math, "random").mockReturnValue(0.4);
      await expect(fakeApi.fetchWithRandomError()).resolves.toBeDefined();
    });
  });

  // 課題2: fetchDataWithDelayとfetchWithTimeoutのテスト
  describe("データフェッチとタイムアウトのテスト", () => {
    it("fetchDataWithDelayが指定時間後に値を返すこと", async () => {
      vi.useFakeTimers();
      const promise = fakeApi.fetchDataWithDelay("テストデータ", 1000);

      // タイマーを進める
      vi.advanceTimersByTime(1000);

      const result = await promise;
      expect(result).toBe("テストデータ");
      vi.useRealTimers();
    });

    it("fetchWithTimeoutがタイムアウトすること", async () => {
      vi.useFakeTimers();

      // 3秒かかる処理に2秒のタイムアウトを設定
      const slowPromise = fakeApi.fetchDataWithDelay("遅いデータ", 3000);
      const timeoutPromise = fakeApi.fetchWithTimeout(slowPromise, 2000);

      // 2秒進める（タイムアウトするはず）
      vi.advanceTimersByTime(2000);

      await expect(timeoutPromise).rejects.toThrow(
        "処理がタイムアウトしました",
      );
      vi.useRealTimers();
    });

    it("fetchWithTimeoutが正常に完了すること", async () => {
      vi.useFakeTimers();

      // 1秒かかる処理に2秒のタイムアウトを設定
      const fastPromise = fakeApi.fetchDataWithDelay("速いデータ", 1000);
      const timeoutPromise = fakeApi.fetchWithTimeout(fastPromise, 2000);

      // 1秒進める（タイムアウトしないはず）
      vi.advanceTimersByTime(1000);

      await expect(timeoutPromise).resolves.toBe("速いデータ");
      vi.useRealTimers();
    });
  });

  // 課題3: Promise.allのテスト
  describe("Promise.allのテスト", () => {
    it("複数の非同期処理が並列実行されること", async () => {
      // 3つの数値を返すようにfetchRandomNumberをモック
      const fetchRandomSpy = vi
        .spyOn(fakeApi, "fetchRandomNumber")
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(20)
        .mockResolvedValueOnce(30);

      const results = await Promise.all([
        fakeApi.fetchRandomNumber(),
        fakeApi.fetchRandomNumber(),
        fakeApi.fetchRandomNumber(),
      ]);

      expect(results).toEqual([10, 20, 30]);
      expect(fetchRandomSpy).toHaveBeenCalledTimes(3);
    });

    it("Promise.allはいずれかがエラーになるとすぐに失敗すること", async () => {
      // 2番目のPromiseだけ失敗するようにモック
      const fetchRandomSpy = vi
        .spyOn(fakeApi, "fetchRandomNumber")
        .mockResolvedValueOnce(10)
        .mockRejectedValueOnce(new Error("テストエラー"))
        .mockResolvedValueOnce(30);

      await expect(
        Promise.all([
          fakeApi.fetchRandomNumber(),
          fakeApi.fetchRandomNumber(),
          fakeApi.fetchRandomNumber(),
        ]),
      ).rejects.toThrow("テストエラー");

      expect(fetchRandomSpy).toHaveBeenCalledTimes(3);
    });
  });

  // 発展課題: Promise.allSettledのテスト
  describe("Promise.allSettledのテスト", () => {
    it("すべての結果（成功と失敗）を取得できること", async () => {
      // 成功と失敗が混ざるようにモック
      vi.spyOn(fakeApi, "fetchWithRandomError")
        .mockResolvedValueOnce(10) // 成功
        .mockRejectedValueOnce(new Error("失敗1")) // 失敗
        .mockResolvedValueOnce(30); // 成功

      const results = await Promise.allSettled([
        fakeApi.fetchWithRandomError(),
        fakeApi.fetchWithRandomError(),
        fakeApi.fetchWithRandomError(),
      ]);

      expect(results).toHaveLength(3);

      // 各結果の状態をチェック
      expect(results[0].status).toBe("fulfilled");
      expect((results[0] as PromiseFulfilledResult<number>).value).toBe(10);

      expect(results[1].status).toBe("rejected");
      expect((results[1] as PromiseRejectedResult).reason.message).toBe(
        "失敗1",
      );

      expect(results[2].status).toBe("fulfilled");
      expect((results[2] as PromiseFulfilledResult<number>).value).toBe(30);
    });
  });
});
