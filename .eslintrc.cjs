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
        '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/ts/indent': ['error', 4],
        '@stylistic/ts/quotes': ['error', 'single'],
        '@stylistic/ts/semi': ['error', 'always'],
    },
}
