const os = require("node:os");
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

// cpu核数，多进程打包
const threads = os.cpus().length;

module.exports = (env) => {
  const isEnvDevelopment = env.development;
  const getStyleLoaders = (preLoader) =>
    [
      isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
      },
      preLoader,
    ].filter(Boolean);

  return {
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      chunkFilename: "asset/js/[name].chunk.js",
      clean: true,
      pathinfo: false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: /\.ts(x)?$/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                  },
                },
                {
                  loader: "ts-loader",
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
              exclude: /node_modules/,
            },
            {
              test: /\.(js?x)$/,
              use: [
                {
                  loader: "thread-loader",
                  options: {
                    workers: threads,
                  },
                },
                {
                  loader: "babel-loader",
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                  },
                },
              ],
              exclude: /node_modules/,
            },
            {
              test: /\.css$/,
              use: getStyleLoaders(),
              exclude: /\.module\.css$/,
            },
            {
              test: /\.less$/,
              use: [...getStyleLoaders("less-loader")],
            },
            {
              test: /\.(svg|png|jpe?g)$/,
              type: "asset",
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: "body",
        template: "public/index.html",
        favicon: "public/favicon.ico",
        filename: "index.html",
        chunks: ["index"],
      }),
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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    performance: false,
  };
};
