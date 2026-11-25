import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import globals from 'globals';

export default defineConfig([
  { ignores: ['playwright-report/', 'test-results/'] },
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['tests/**', 'pages/**', 'fixtures/**'],
    extends: [playwright.configs['flat/recommended']],
  },
]);
