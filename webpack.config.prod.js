const os = require("node:os");
const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length;

module.exports = (env) => {
  return {
    mode: "production",
    devtool: false,
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "asset/js/[name].[contenthash:8].js",
      assetModuleFilename: "asset/media/[contenthash:8][ext]",
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "asset/css/[name].[contenthash:8].css",
        chunkFilename: "asset/css/[name].[contenthash:8].css",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin({
          parallel: threads,
        }),
      ],
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    },
  };
};
