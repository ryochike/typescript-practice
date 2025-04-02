// 課題: ジェネリクスを使用したコンテナクラス

/**
 * あらゆる型の値を格納できるボックスクラス
 */
export class GenericBox<T> {
  private value: T;

  /**
   * コンストラクタ
   * @param value ボックスに格納する値
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * ボックスから値を取得する
   * @returns ボックスに格納された値
   */
  getValue(): T {
    return this.value;
  }

  /**
   * ボックスの値を更新する
   * @param newValue 新しい値
   */
  setValue(newValue: T): void {
    this.value = newValue;
  }

  /**
   * ボックスの値を文字列表現にする
   */
  toString(): string {
    return `Box(${String(this.value)})`;
  }
}
