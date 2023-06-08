const OFF = 0;
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "react/function-component-definition": OFF, // react函数式组件的定义方式
    "import/prefer-default-export": OFF, // 只有一个导出时，优先默认导入
    "react/destructuring-assignment": OFF, // 解构使用道具
    "react/jsx-props-no-spreading": OFF, // 解构道具分配
    "react-hooks/rules-of-hooks": OFF, // React Hook cannot be called inside a callback
    "react/jsx-one-expression-per-line": OFF,
    "@typescript-eslint/default-param-last": OFF, // 默认参数应该放在最后
    "react/button-has-type": OFF, // 指定button的type，表单元素中包含按钮，默认为type=submit
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "_" }], // 声明变量未被使用
    "no-plusplus": OFF, // 允许使用 ++
    "no-console": OFF, // 允许console
    "no-param-reassign": OFF, // 直接修改函数参数
    "import/no-import-module-exports": OFF, // 在CommonJS导出的模块中使用import声明
  },
};
