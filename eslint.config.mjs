import js from '@eslint/js';
import preact from 'eslint-config-preact';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    ...preact,
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        plugins: {
            js,
        }, extends: ['js/recommended'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: globals.browser,
        },
        rules: {
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
        },
    },
]);
