import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]|^motion$' }],
      // Math.random() inside useMemo([]) is a deliberate one-shot seed.
      'react-hooks/purity': 'off',
      // React 19's set-state-in-effect rule is too strict for legitimate
      // patterns like setting initial state from an environment check.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['api/**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['src/context/**/*.{js,jsx}', 'src/hooks/**/*.{js,jsx}'],
    rules: {
      // Hooks/contexts intentionally export non-component helpers alongside
      // the provider; Fast Refresh still works in practice.
      'react-refresh/only-export-components': 'off',
    },
  },
])
