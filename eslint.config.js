import antfu from '@antfu/eslint-config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default antfu(
  {
    type: 'app',

    react: true,
    typescript: true,

    stylistic: true,

    ignores: [
      'package.json',
      'node_module',
      '.vscode',
      'tsconfig.*.json'
    ]

  },

  /* import Plugin */
  {
    name: 'mizsery/simple-import',
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'import/order': 'off',
      'sort-imports': 'off',
      'import/extensions': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // External packages:
            ['^react', '^@?\\w'],
            // Alias imports:
            ['^~(([\\/.]?\\w)|assets|test-utils)'],
            // Side effect imports:
            ['^\\u0000'],
            // Parent imports:
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports:
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports:
            ['^.+\\.s?css$']
          ]
        }
      ]
    }
  },

  {
    name: 'mizsery/jsx-a11y',
    plugins: {
      'mizsery-jsx-a11y': jsxA11y
    },
    rules: {
      ...Object.entries(jsxA11y.flatConfigs.recommended.rules).reduce(
        (acc, [key, value]) => {
          acc[key.replace('jsx-a11y', 'mizsery-jsx-a11y')] = value;
          return acc;
        },
        {}
      )
    }
  },

  {
    name: 'mizsery/react',
    plugins: {
      'mizsery-react': pluginReact
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...Object.entries(pluginReact.configs.recommended.rules).reduce(
        (acc, [key, value]) => {
          acc[key.replace('react', 'mizsery-react')] = value;
          return acc;
        },
        {}
      ),
      'mizsery-react/react-in-jsx-scope': 'off',
      'mizsery-react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function'],
          unnamedComponents: 'arrow-function'
        }
      ]
    }
  },
  /* Style */
  {
    name: 'mizsery/style',
    rules: {
      'style/multiline-ternary': 'off',
      'style/jsx-curly-newline': 'off',
      'style/jsx-one-expression-per-line': 'off',
      'style/member-delimiter-style': 'off',
      'style/quote-props': 'off',
      'style/brace-style': 'off',

      'style/max-len': [
        'error',
        100,
        2,
        { ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }
      ],
      'style/quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'style/jsx-quotes': ['error', 'prefer-single'],
      'style/comma-dangle': ['error', 'never'],
      'style/semi': ['error', 'always'],
      'style/indent': ['error', 2, { SwitchCase: 1 }],
      'style/no-tabs': 'error',
      'style/linebreak-style': ['error', 'unix'],
      'style/arrow-parens': ['error', 'always']
    }
  },
  /* Rules */
  {
    name: 'mizsery/rules',
    rules: {
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'antfu/curly': 'off',

      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'error',

      'ts/no-explicit-any': 'error',
      'ts/no-shadow': 'error',
      'no-console': ['warn', { allow: ['error'] }]
    }
  }
);
