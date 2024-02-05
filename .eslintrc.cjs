module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended', // 启用一系列核心规则 eslint规则页面展示
    'plugin:@typescript-eslint/recommended', // ts规则配置
    'plugin:react/recommended', // eslint-plugin-react的规则配置
    'plugin:prettier/recommended', // 推荐使用prettier的规则（处理兼容的）
    'plugin:react/jsx-runtime' // 解决react17版本不需要引入React的问题
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // 允许使用any
    '@typescript-eslint/no-explicit-any': 'off',
    // 允许使用namespace
    '@typescript-eslint/no-namespace': 'off'
  }
};
