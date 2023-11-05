const path = require("node:path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const os = require("node:os");

// cpu核数，多进程打包
const threads = os.cpus().length;

module.exports = () => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: "asset/js/[name].js",
      assetModuleFilename: "asset/media/[name][ext]",
    },
    plugins: [
      new ESLintWebpackPlugin({
        context: path.resolve(__dirname, "src"),
        exclude: "node_modules",
        cache: true,
        cacheLocation: path.resolve(
          __dirname,
          "../node_modules/.cache/.eslintcache"
        ),
        threads,
      }),
    ],
    devServer: {
      port: 80,
      static: "./dist",
      compress: true,
      historyApiFallback: true,
      hot: true,
      client: {
        logging: "none",
        overlay: false,
      },
      watchFiles: ["./src"],
      open: true,
    },
  };
};
