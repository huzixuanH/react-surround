const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  /**
   * @see https://github.com/jsx-eslint/eslint-plugin-react
   * @see https://typescript-eslint.io/getting-started
   * @see https://github.com/prettier/eslint-config-prettier
   **/
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": ERROR,
    "no-multiple-empty-lines": [ERROR, { max: 1 }],
    "no-use-before-define": OFF,
    "no-redeclare": WARN,

    // typescript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": ERROR,
  },
};
