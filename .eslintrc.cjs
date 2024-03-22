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
        '@stylistic/ts/keyword-spacing': [
            'error', { 'before': true, 'after': true },
        ],
        '@stylistic/ts/lines-around-comment': [
            'error',
            {
                'beforeBlockComment': true,
                'beforeLineComment': true,
                'allowBlockStart': true,
                'allowObjectStart': true,
                'allowArrayStart': true,
                'allowClassStart': true,
            },
        ],
        '@stylistic/ts/member-delimiter-style': 'error',
        '@stylistic/ts/no-extra-parens': 'error',
        '@stylistic/ts/object-curly-spacing': ['error', 'always'],
        '@stylistic/ts/padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        ],
        '@stylistic/ts/quote-props': [
            'error', 'as-needed', { keywords: true, numbers: true },
        ],
        '@stylistic/ts/quotes': ['error', 'single'],
        '@stylistic/ts/semi': ['error', 'always'],
        '@stylistic/ts/space-before-blocks': ['error', 'always'],
        '@stylistic/ts/space-before-function-paren': ['error', 'always'],
        '@stylistic/ts/space-infix-ops': 'error',

        // TODO: It would be nice to turn this on but it conflicts with
        // key-spacing align: 'colon'.
        // '@stylistic/ts/type-annotation-spacing': 'error',
    },
}
