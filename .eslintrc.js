module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'plugin:react/recommended',
    // 'airbnb',
  ],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: true,
    // },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  // plugins: [
  //   'react',
  //   // '@typescript-eslint',
  // ],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-var': 'off',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'vars-on-top': 'off',
    'max-len': ['warn', { code: 100 }],
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    // suppress errors for missing 'import React' in files
    // 'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    // should add ".ts" if typescript project
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  overrides: [
    {
      files: ['./**/*.ts', './**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        /* ... */
      ],
      rules: {
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false, classes: true, variables: true, typedefs: true,
          },
        ],
      },
    },
  ],
};
