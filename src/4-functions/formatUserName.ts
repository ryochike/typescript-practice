// 課題: 関数のオプション引数とデフォルト値

/**
 * 課題1: ユーザー名と任意の役職を受け取り、フォーマットする関数を実装してください
 * - role がある場合: "名前 (役職)" の形式で返す
 * - role がない場合: "名前" だけを返す
 *
 * 【純粋関数の観点】
 * - 関数は引数だけで結果が決まるように実装してください
 * - 外部の変数や状態を変更しないでください
 * - 同じ引数ならいつ呼び出しても同じ結果が返るようにしてください
 */
function formatUserName(name: string, role?: string): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserName("Alice")); // "Alice" と出力されるはずです
console.log(formatUserName("Bob", "Designer")); // "Bob (Designer)" と出力されるはずです

/**
 * 課題2: 役職にデフォルト値 "Guest" を設定した関数を実装してください
 * - 引数 role を省略したときに "Guest" が代わりに使われます
 * - 出力形式は課題1と同様: "名前 (役職)"
 *
 * 【純粋関数の観点】
 * - 外部の状態に依存せず、同じ引数なら常に同じ出力になるようにしてください
 * - role が渡されなかった場合でも一貫した初期値 ("Guest") を設定することで予測可能な動作にします
 */
function formatUserNameWithDefault(name: string, role = "Guest"): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserNameWithDefault("Charlie")); // "Charlie (Guest)" と出力されるはずです
console.log(formatUserNameWithDefault("Dave", "Admin")); // "Dave (Admin)" と出力されるはずです

/**
 * 課題3 (発展): オプション引数とデフォルト値を組み合わせた関数を実装してください
 * - name: 必須のユーザー名
 * - role: 任意の役職
 * - prefix: デフォルト値 "User:" を持つ接頭辞
 *
 * 【ポイント】
 * 1. 可能な限り、引数とその組み合わせだけで結果を決めてください
 * 2. 同じ引数で呼び出せば常に同じ結果が得られるコード設計を意識してください
 */
function formatUserNameCombined(
  name: string,
  role?: string,
  prefix = "User:",
): string {
  // ここにコードを実装してください
  return ""; // TODO: この行を適切な実装に置き換えてください
}

// 動作確認
console.log(formatUserNameCombined("Eve")); // "User: Eve" と出力されるはずです
console.log(formatUserNameCombined("Frank", "Developer")); // "User: Frank (Developer)" と出力されるはずです
console.log(formatUserNameCombined("Grace", "Manager", "Employee:")); // "Employee: Grace (Manager)" と出力されるはずです

/**
 * 考察: 以下の項目について考えて、コメントとして記述してみましょう
 *
 * - オプション引数 (role?: string):
 *
 *
 * - デフォルト値 (role = "Guest"):
 *
 *
 * - 純粋関数 (Pure Function) のメリット:
 *
 */
