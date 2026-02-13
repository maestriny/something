const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  ...expoConfig,
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-eval': 'error',
      eqeqeq: 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '.expo/', 'babel.config.js'],
  },
  prettierConfig,
];
