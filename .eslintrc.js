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
  rules: {},
};
