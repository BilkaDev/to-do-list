import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig
    ],
    plugins: {
      'jsx-a11y': jsxA11y
    },
    rules: {
      'jsx-a11y/alt-text': 'error'
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
]);
