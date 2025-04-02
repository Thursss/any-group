export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // 模拟浏览器环境
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    // 处理 TypeScript 和 Vue 文件
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleNameMapper: {
    // 处理别名（与 tsconfig.json 中的 paths 一致）
    '^@/(.*)$': '<rootDir>/packages/$1',
    '^~/(.*)$': '<rootDir>/utils/$1',
    // 处理静态资源（如 CSS）
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)', // 匹配 .test.js/.test.ts/.test.jsx/.test.tsx
    '**/?(*.)+(spec|test).[jt]s?(x)', // 匹配根目录下的 spec/test 文件
  ],
}
