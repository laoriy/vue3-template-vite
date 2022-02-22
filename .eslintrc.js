module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
            // vue单文件组件支持lang="tsx" 的格式化
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: 0,
        'linebreak-style': 0,
        'no-trailing-spaces': 0,
        'class-methods-use-this': 0,
        'import/prefer-default-export': 0,
        'no-restricted-syntax': 0,
        'no-tabs': 0,
        'import/no-unresolved': 0,
        'no-underscore-dangle': 0,
        'comma-dangle': 'off',
        'max-len': 'off',
        camelcase: 'off',
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        'guard-for-in': 0,
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        // https://stackoverflow.com/questions/65054079/eslint-with-typescript-and-firebase-no-undef-error
        'no-undef': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/issues/2483
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        // 不安全项
        'no-param-reassign': 0,
        // js项目开启检查
        'no-dupe-class-members': 0,
        // 提示警告
        'no-return-await': 1,
        'import/no-cycle': 1,
        'no-nested-ternary': 1,
        'no-new-func': 1,
        'vue/no-side-effects-in-computed-properties': 1,
        'vue/valid-template-root': 1,
        'import/no-extraneous-dependencies': 1,
        'no-continue': 1,
        'operator-assignment': 1,
        'no-bitwise': 1,

        // TODO:待修改
        'prefer-destructuring': 2,
        'array-callback-return': 2,
        'func-names': 2,
        'no-plusplus': 2,
        'no-mixed-operators': 2,
        'no-fallthrough': 2,
        'default-case': 2,
        'no-useless-constructor': 2,
        // 保证js、ts项目arrow风格一致
        'arrow-parens': [2, 'always', { requireForBlockBody: false }],
        'implicit-arrow-linebreak': [0, 'beside'],
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index'],
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                directory: './tsconfig.json',
            },
        },
    },
};
