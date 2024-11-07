module.exports = {
    parser: "@typescript-eslint/parser", // 使用 TypeScript 解析器
    plugins: ["@typescript-eslint", "react", "react-hooks"], // 使用的插件
    extends: [
      "eslint:recommended", // 使用推荐的规则
      "plugin:react/recommended", // 使用 React 插件的推荐规则
      "plugin:@typescript-eslint/recommended", // 使用 TypeScript 插件的推荐规则
      "plugin:react-hooks/recommended", // 使用 React Hooks 的推荐规则
    ],
    rules: {
      // 这里可以覆盖一些规则
      "@typescript-eslint/no-explicit-any": "off", // 允许使用any类型
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error", // 检查 Hooks 规则
      "react-hooks/exhaustive-deps": "warn", // 检查依赖项数组
      "react/prop-types": "off", // 禁用 props 验证
    },
  };
  