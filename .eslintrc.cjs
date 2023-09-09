module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': ['error', 'single'], // 引号类型 强制使用单引号
    'semi': ['error', 'always'], // 语句强制分号结尾
    '@typescript-eslint/no-explicit-any': 'off',  // 允许使用 any
    'indent': ['error', 2, { SwitchCase: 1 }], // tab缩进为2个空格
  },
}
