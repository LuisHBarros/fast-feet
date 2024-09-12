import { ESLint } from 'eslint';

export default [
    {
        ignores: ['node_modules/', 'dist/'],
    },
    {
        files: ['*.ts'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        parser: '@typescript-eslint/parser',
        plugins: {
            '@typescript-eslint': '@typescript-eslint/eslint-plugin',
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': 'error',
        },
    },
];
