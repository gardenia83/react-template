module.exports = {
  env: {
    browser: true,
    es2021: true,
    serviceworker: true,
  },
  plugins: ['import', 'promise', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新的 ECMAScript 语法
    sourceType: 'module', // 使用 ES 模块语法 (import/export)
  },
  rules: {
    'prettier/prettier': 'error', // 将 Prettier 格式化问题报告为错误
    'no-unused-vars': 'error', // 禁止未使用的变量
    'no-console': 'warn', // 警告使用 console，生产环境建议设为 'error'
    'import/no-unresolved': 'error',
    'promise/always-return': 'warn',
    // Service Worker 相关
    'no-restricted-globals': ['error', 'event'], // 在 SW 中避免直接使用 event
    // 导入排序规则 - 自动整理 import 语句的顺序
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js 内置模块 (fs, path 等)
          'external', // 外部依赖 (npm 包)
          'internal', // 内部模块 (别名路径等)
          'parent', // 父级目录导入
          'sibling', // 同级目录导入
          'index', // 索引文件导入
        ],
        'newlines-between': 'always', // 在不同组之间添加空行
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'], // 解析这些扩展名的模块
      },
    },
  },
};
