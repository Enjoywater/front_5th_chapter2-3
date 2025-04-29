import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            { target: './src/features', from: './src/app' },
            { target: './src/features', from: './src/widgets' },
            { target: './src/entities', from: './src/app' },
            { target: './src/entities', from: './src/widgets' },
            { target: './src/entities', from: './src/features' },
            { target: './src/shared', from: './src/app' },
            { target: './src/shared', from: './src/widgets' },
            { target: './src/shared', from: './src/features' },
            { target: './src/shared', from: './src/entities' },
          ],
        },
      ],
    },
  },
);
