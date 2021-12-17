module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:no-unsanitized/DOM',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: [
    'react',
    'simple-import-sort',
    'sort-keys-fix',
    'sort-destructure-keys',
    'import',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
    jest: true,
  },
  rules: {
    // Do not allow dangerously setting innerHTML
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',

    // Do not allow alert
    'no-alert': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

    // Not turned on by default
    'no-unused-expressions': 'off',

    // Not turned on by default
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'error',

    // Sorting imports
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^react', '^prop-types'],
          ['^@material-ui'],
          ['^assets'],
          ['^@?\\w'],
          ['^[^.]'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',

    // Sort props and keys
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        natural: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: false },
    ],
  },
  globals: {},
}
