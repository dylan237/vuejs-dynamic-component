module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
}
