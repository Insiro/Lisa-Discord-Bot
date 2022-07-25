module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir : __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    root:true,
    env: {
        jest: true,
        node: true
    },
    ignorePatterns: ['.eslintrc.js', "*.env"],
}
