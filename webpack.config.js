/**@type { import ("webpack").Configuration} */
const config = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: !0 ? 'development' : 'production',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: './scripts/main.ts',
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader',
            },
        ],
    },
    // import 文で .ts ファイルを解決するため
    // これを定義しないと import 文で拡張子を書く必要が生まれる。
    // フロントエンドの開発では拡張子を省略することが多いので、
    // 記載したほうがトラブルに巻き込まれにくい。
    resolve: {

        extensionAlias: {
            ".js": [
                '.ts', '.js',
            ],
        }
    },
    stats: { errorDetails: true }
};
module.exports = config;