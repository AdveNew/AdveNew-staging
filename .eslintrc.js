module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always'],
    'react/prop-types': [0],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/destructuring-assignment': [1, 'never'],
    'react/jsx-one-expression-per-line': [0],
  },
};
