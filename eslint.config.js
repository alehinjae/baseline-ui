import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

// Warn-only no baseline dos arquivos existentes (spec 0001, não-objetivo:
// não é "zerar todo warning hoje") — só regras que pegam bug real (hooks
// usados fora de ordem/condicional, variável não declarada) ficam error,
// porque não deveriam disparar em código correto de qualquer forma.
export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'audit/**',
      'node_modules/**',
      'src/tokens.css',
      // gerado pelo Claude Design (claude.ai/design) sincronizando com o
      // design system — não é código nosso, já ignorado no .gitignore
      'ds-bundle/**',
      '.ds-sync/**',
      '.design-sync/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // scripts/*.mjs e configs de build/teste rodam em Node, não no navegador
    files: ['scripts/**/*.mjs', '*.config.{js,ts,mjs}', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: '19' } },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 19 + JSX automático — não precisa import React
      'react/prop-types': 'off', // TypeScript já cobre isso
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettierConfig,
)
