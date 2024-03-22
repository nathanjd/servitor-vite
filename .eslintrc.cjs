module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        '@stylistic/ts',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@stylistic/ts/block-spacing': ['error', 'always'],
        '@stylistic/ts/brace-style': [
            'error', '1tbs', { "allowSingleLine": false },
        ],
        '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/ts/comma-spacing': [
            'error', { 'before': false, 'after': true },
        ],
        '@stylistic/ts/function-call-spacing': ['error', 'never'],
        '@stylistic/ts/indent': ['error', 4],
        '@stylistic/ts/key-spacing': [
            'error',
            { 'beforeColon': false, 'afterColon': true, 'align': 'colon' },
        ],
        '@stylistic/ts/quotes': ['error', 'single'],
        '@stylistic/ts/semi': ['error', 'always'],
    },
}
